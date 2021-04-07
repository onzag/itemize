/**
 * This file specifies a base for creating a payment provider
 * with all the necessary functions that it should offer
 * 
 * @module
 */

import type Module from "../../../base/Root/Module";
import type ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import type Include from "../../../base/Root/Module/ItemDefinition/Include";
import type PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import type { ISQLTableRowValue } from "../../../base/Root/sql";
import type { IGQLArgs, IGQLValue } from "../../../gql-querier";

import { IPropertyDefinitionSupportedPaymentType, PaymentStatusType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/payment";
import { ServiceProvider, ServiceProviderType } from "..";
import { paymentSQLHiddenMetadataRow, paymentSQLOut } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/sql/payment";

/**
 * These are our payment events and when
 * they occur
 */
export enum PaymentEvent {
  /**
   * A payment object was created, usually when the
   * object itself is added but this event also triggers
   * when the payment field goes from null to non-null
   * the payment begins to exist
   */
  CREATED = "CREATED",
  /**
   * A payment object has been destroyed, an update already
   * made it go null, or a delete event rid of the row
   */
  DESTROYED = "DESTROYED",
  PENDING = "PENDING",
  PAID = "PAID",
  DISPUTED = "DISPUTED",
  REFUNDED = "REFUNDED",
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
}

export interface IPaymentProviderPaymentExtraInfo {
  module: Module;
  item: ItemDefinition;
  include?: Include,
  property: PropertyDefinition;
  id: string;
  version: string;
  originalStatus: PaymentStatusType;
  originalMetadata: string;
  originalSQLData: ISQLTableRowValue;
  uuid: string;
}

type SetHiddenMetadataAsJSONType = (attr: string, value: any) => void;
type SetHiddenMetadataAsJSONType2 = (value: any) => void;
export interface IPaymentProviderPaymentExtraInfoWithHiddenMetadata extends IPaymentProviderPaymentExtraInfo {
  originalHiddenMetadata: string;
  getHiddenMetadata: () => string;
  setHiddenMetadata: (hiddenMetadata: string) => void;
  getHiddenMetadataAsJSON: (attr?: string) => any;
  setHiddenMetadataAsJSON: SetHiddenMetadataAsJSONType | SetHiddenMetadataAsJSONType2;
}

export interface IPaymentEventObject extends IPaymentProviderPaymentExtraInfoWithHiddenMetadata {
  event: PaymentEvent;
  payment: IPropertyDefinitionSupportedPaymentType;
}

export type PaymentEventListener = (evObj: IPaymentEventObject) => Promise<void> | void;

export interface IPaymentUniqueLocation {
  id: string;
  version: string;
  item: ItemDefinition | string;
  include?: Include | string;
  property: PropertyDefinition | string;
};

type PaymentListeners = Record<PaymentEvent, PaymentEventListener[]>;

export const statusToEvents: Record<PaymentStatusType, PaymentEvent> = {
  [PaymentStatusType.ACTIVE]: PaymentEvent.ACTIVE,
  [PaymentStatusType.INACTIVE]: PaymentEvent.INACTIVE,
  [PaymentStatusType.DISPUTED]: PaymentEvent.DISPUTED,
  [PaymentStatusType.PAID]: PaymentEvent.PAID,
  [PaymentStatusType.REFUNDED]: PaymentEvent.REFUNDED,
  [PaymentStatusType.PENDING]: PaymentEvent.PENDING,
}

export default class PaymentProvider<T> extends ServiceProvider<T> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }

  private listeners: PaymentListeners = {
    CREATED: [],
    DESTROYED: [],
    PENDING: [],
    PAID: [],
    DISPUTED: [],
    REFUNDED: [],
    INACTIVE: [],
    ACTIVE: [],
  };

  private hiddenMetadataProcessing: {
    [uuid: string]: string;
  };

  private setHiddenMetadataAtWithoutProcessing(uuid: string, hiddenMetadata: string) {
    this.hiddenMetadataProcessing[uuid] = hiddenMetadata;
  }

  private setHiddenMetadataAtWithoutProcessingJSON(uuid: string, valueOrAttr: any, value?: any) {
    if (typeof value !== "undefined") {
      const attr = valueOrAttr.toString() as string;
      const newValue = this.getHiddenMetadataInBetweenProcessingJSON(uuid) || {};
      newValue[attr] = value;
      this.setHiddenMetadataAtWithoutProcessingJSON(uuid, newValue);
      return;
    }

    if (valueOrAttr === null) {
      this.setHiddenMetadataAtWithoutProcessing(uuid, null);
    } else {
      this.setHiddenMetadataAtWithoutProcessing(uuid, JSON.stringify(valueOrAttr));
    }
  }

  private getHiddenMetadataInBetweenProcessing(uuid: string) {
    return this.hiddenMetadataProcessing[uuid];
  }

  private getHiddenMetadataInBetweenProcessingJSON(uuid: string, attr?: string) {
    if (this.hiddenMetadataProcessing[uuid] === null) {
      return null;
    }
    const parsed = JSON.parse(this.hiddenMetadataProcessing[uuid]);
    return typeof attr !== "undefined" && attr !== null ? parsed[attr] : parsed;
  }

  private processSettingOfHiddenMetadataAt(uuid: string, compareAgainst?: string) {
    const storedValue = this.hiddenMetadataProcessing[uuid];
    delete this.hiddenMetadataProcessing[uuid];

    if (typeof compareAgainst !== "undefined" && compareAgainst === storedValue) {
      return;
    }

    const location = this.unwrapUUIDFor(uuid);

    // gather the prefix
    const prefix: string = location.include ? (location.include as Include).getPrefixedQualifiedIdentifier() : "";

    // now we can get the hidden metadata row
    const hiddenMetadataRow = paymentSQLHiddenMetadataRow(prefix, (location.property as PropertyDefinition).getId());

    // peform a silent update, hidden metadata is always fetched on
    // update of the row, this means it doesn't need to be informed
    // this makes it an efficient update that does not
    // bother other clusters
    this.localAppData.rawDB.performRawDBUpdate(
      location.item,
      location.id,
      location.version,
      {
        dangerousUseSilentMode: true,
        itemTableUpdate: {
          [hiddenMetadataRow]: storedValue,
        },
      }
    );
  }

  public setHiddenMetadataAt(uuid: string, hiddenMetadata: string) {
    this.setHiddenMetadataAtWithoutProcessing(uuid, hiddenMetadata);
    this.processSettingOfHiddenMetadataAt(uuid);
  }

  /**
   * Provides an uuid for a given payment event
   * this uuid is related to the space that this payment is taking in
   * the row of the database and it's unique for that payment object
   * @param info 
   */
  public getUUIDFor(info: IPaymentProviderPaymentExtraInfo | IPaymentUniqueLocation) {
    const itemDef = typeof info.item === "string" ?
      this.localAppData.root.registry[info.item] as ItemDefinition : info.item;
    const include = info.include ? (
      typeof info.include === "string" ?
        itemDef.getIncludeFor(info.include) : info.include
    ) : null;
    const propDef = typeof info.property === "string" ? (
      include ? include.getSinkingPropertyFor(info.property) : itemDef.getPropertyDefinitionFor(info.property, true)
    ) : info.property;

    return info.id + "." +
      (info.version || "") + "." +
      propDef.getId() +
      (info.include ? "." + include.getId() : "") + "." +
      itemDef.getQualifiedPathName();
  }

  /**
   * For a given uuid it will find the table, row id, location, etc...
   * where the uuid payment is referenced
   * @param uuid the uuid to unwrap
   * @returns the payment object location
   */
  public unwrapUUIDFor(uuid: string): IPaymentUniqueLocation {
    const splitted = uuid.split(".");
    let id: string;
    let version: string;
    let propertyId: string;
    let includeId: string;
    let itemQualifiedName: string;
    if (splitted.length === 5) {
      id = splitted[0];
      version = splitted[1] || null;
      propertyId = splitted[2];
      includeId = splitted[3];
      itemQualifiedName = splitted[4];
    } else if (splitted.length === 4) {
      id = splitted[0];
      version = splitted[1] || null;
      propertyId = splitted[2];
      itemQualifiedName = splitted[3];
    } else {
      throw new Error("Invalid uuid " + uuid);
    }

    const item = this.localAppData.root.registry[itemQualifiedName] as ItemDefinition;
    const include = includeId ? item.getIncludeFor(includeId) : null;
    const property = include ? include.getSinkingPropertyFor(propertyId) : item.getPropertyDefinitionFor(propertyId, true);

    return {
      id,
      version,
      item,
      property,
      include,
    }
  }

  /**
   * This function is intended to be used by the itemize server itself
   * in order to internally trigger the events when it finds payment
   * information changing
   * 
   * You are not supposed to use this function yourself, as it's used
   * internally when things happen
   *
   * @param ev the event type to trigger
   * @param payment the payment object in question
   * @param hiddenMetadata the hidden metadata of the element
   * @param info the extra information for the event
   */
  public async triggerEvent(
    ev: PaymentEvent,
    payment: IPropertyDefinitionSupportedPaymentType,
    hiddenMetadata: string,
    info: IPaymentProviderPaymentExtraInfo,
  ) {
    // let's prepare the hidden metadata functions
    const setHiddenMetadataFn = this.setHiddenMetadataAtWithoutProcessing.bind(this, info.uuid);
    const setHiddenMetadataJSONFn = this.setHiddenMetadataAtWithoutProcessingJSON.bind(this, info.uuid);
    const getHiddenMetadataFn = this.getHiddenMetadataInBetweenProcessing.bind(this, info.uuid);
    const getHiddenMetadataJSONFn = this.getHiddenMetadataInBetweenProcessingJSON.bind(this, info.uuid);

    // now we prepare the initial hidden metadata
    this.setHiddenMetadataAtWithoutProcessing(info.uuid, hiddenMetadata);

    // this is the event argument payload object
    const arg = {
      event: ev,
      getHiddenMetadata: getHiddenMetadataFn,
      getHiddenMetadataAsJSON: getHiddenMetadataJSONFn,
      setHiddenMetadata: setHiddenMetadataFn,
      setHiddenMetadataAsJSON: setHiddenMetadataJSONFn,
      payment,
      originalHiddenMetadata: hiddenMetadata,
      ...info,
    };

    // now we prepare these and call them via a promise
    await Promise.all(this.listeners[ev].map((l) => l(arg)));

    // and now we can actually set and update the hidden metadata
    this.processSettingOfHiddenMetadataAt(info.uuid);
  }

  /**
   * Basically the same as changePaymentStatus but
   * changes it to status inactive
   * @param uuidOrLocation 
   * @param extras 
   * @returns a void promise
   */
  public async cancelSubscription(
    uuidOrLocation: string | IPaymentUniqueLocation,
    extras: {
      knownValue?: ISQLTableRowValue;
      metadata?: string;
    } = {},
  ) {
    return this.changePaymentStatus(
      PaymentStatusType.INACTIVE,
      uuidOrLocation,
      extras,
    );
  }

  /**
   * Basically the same as changePaymentStatus but
   * changes it to status active
   * @param uuidOrLocation 
   * @param extras 
   * @returns a void promise
   */
  public async activateSubscription(
    uuidOrLocation: string | IPaymentUniqueLocation,
    extras: {
      knownValue?: ISQLTableRowValue;
      metadata?: string;
    } = {},
  ) {
    return this.changePaymentStatus(
      PaymentStatusType.ACTIVE,
      uuidOrLocation,
      extras,
    );
  }

  public async retrievePaymentObject(uuidOrLocation: string | IPaymentUniqueLocation, knownValue?: ISQLTableRowValue) {
    // first let's convert the location if we need it
    const location: IPaymentUniqueLocation = typeof uuidOrLocation === "string" ?
      this.unwrapUUIDFor(uuidOrLocation) : uuidOrLocation;

    // now let's get the information from that given location
    const itemDef = typeof location.item === "string" ?
      this.localAppData.root.registry[location.item] as ItemDefinition : location.item;
    const include = location.include ? (
      typeof location.include === "string" ?
        itemDef.getIncludeFor(location.include) : location.include
    ) : null;
    const propDef = typeof location.property === "string" ? (
      include ? include.getSinkingPropertyFor(location.property) : itemDef.getPropertyDefinitionFor(location.property, true)
    ) : location.property;

    // gather the prefix
    const prefix: string = include ? include.getPrefixedQualifiedIdentifier() : "";

    // now we can get the hidden metadata row
    const hiddenMetadata = paymentSQLHiddenMetadataRow(prefix, propDef.getId());

    // and let's get the sql value of the row
    const value: ISQLTableRowValue = typeof knownValue !== "undefined" ?
      knownValue : await this.localAppData.cache.requestValue(location.item, location.id, location.version);

    // so we can extract these two
    const currentValue: IPropertyDefinitionSupportedPaymentType = paymentSQLOut({
      id: propDef.getId(),
      itemDefinition: itemDef,
      prefix,
      property: propDef,
      row: value,
      serverData: this.localAppData.cache.getServerData(),
      include,
    });

    return {
      value: currentValue,
      hiddenMetadata,
      item: itemDef,
      include,
      property: propDef,
      location,
      rowValue: value,
    };
  }

  /**
   * Allows to pick and find a payment object in the database and change its status
   * from one to another, the change is realtime and affects the client side
   * as well as whatever listeners are around
   * 
   * @param status the new status to assign to the payment
   * @param uuidOrLocation the uuid of the payment or the unwrapped unique location
   * @param extras.knownValue if the value of the row is already known provide it, it will help speed up
   * @param extras.metadata change the metadata during this event
   */
  public async changePaymentStatus(
    status: PaymentStatusType,
    uuidOrLocation: string | IPaymentUniqueLocation,
    extras: {
      knownValue?: ISQLTableRowValue | IGQLValue;
      metadata?: string;
      rometadata?: string;
    } = {}
  ) {
    const paymentObject = await this.retrievePaymentObject(uuidOrLocation, extras.knownValue);;
    const currentValue = paymentObject.value;

    if (!currentValue) {
      return;
    }

    // denied due to equality so it can't change status
    if (currentValue.status === status) {
      return;
    }

    const newValue: IPropertyDefinitionSupportedPaymentType = {
      ...currentValue,
      status,
    };

    if (typeof extras.metadata !== "undefined") {
      newValue.metadata = extras.metadata;
    }

    if (typeof extras.rometadata !== "undefined") {
      newValue.rometadata = extras.rometadata;
    }

    const update: IGQLArgs = {
      [paymentObject.property.getId()]: newValue as any,
    };

    // now we can trigger an update via the cache
    // this will automatically trigger the event back
    // because this is a side effect
    // we are however ignoring the pre side effects
    // because we want to allow to modify the read only
    // rometadata field
    await this.localAppData.cache.requestUpdateSimple(
      paymentObject.item,
      paymentObject.location.id,
      paymentObject.location.version,
      paymentObject.include ? {
        [paymentObject.include.getQualifiedIdentifier()]: update,
      } : update,
      null,
      paymentObject.rowValue,
      {
        ignorePreSideEffects: true,
      }
    );

    // const uuid = typeof uuidOrLocation === "string" ? uuidOrLocation : this.getUUIDFor(uuidOrLocation);

    // this.triggerEvent(
    //   statusToEvents[status],
    //   newValue,
    //   paymentObject.hiddenMetadata,
    //   {
    //     id: paymentObject.location.id,
    //     version: paymentObject.location.version,
    //     item: paymentObject.item,
    //     module: paymentObject.item.getParentModule(),
    //     originalStatus: currentValue.status,
    //     originalMetadata: currentValue.metadata,
    //     originalSQLData: newValueFromSQLUpdate,
    //     property: paymentObject.property,
    //     include: paymentObject.include,
    //     uuid,
    //   }
    // );
  }

  /**
   * Adds an event listener to execute when a payment event has occurred
   * 
   * @param ev the event to bind to
   * @param listener the given listener
   */
  public addEventListener(ev: PaymentEvent, listener: PaymentEventListener) {
    this.listeners[ev].push(listener);
  }

  /**
   * removes an event listener to execute when a payment event has occurred
   * 
   * @param ev the event to unbind for
   * @param listener the given listener
   */
  public removeEventListener(ev: PaymentEvent, listener: PaymentEventListener) {
    const index = this.listeners[ev].indexOf(listener);
    if (index !== -1) {
      this.listeners[ev].splice(index, 1);
    }
  }

  /**
   * When defining a payment you should specify how to issue a refund based on this event
   * this allows the developer to issue a refund based
   * @override
   */
  public executeRefund(
    invoicePaymentUUID: string,
    refundPaymentUUID: string,
    extras: {
      knownInvoicePaymentRowValue?: ISQLTableRowValue;
      knownRefundPaymentRowValue?: ISQLTableRowValue;
    } = {}
  ) {

  }
}
