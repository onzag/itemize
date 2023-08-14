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
  /**
   * A payment popped up (was created) or changed and is in a pending state
   */
  PENDING = "PENDING",
  /**
   * A payment popped up (was created) or changed and is in a paid state
   * note that this state is for when refunds are paid as well
   */
  PAID = "PAID",
  /**
   * A payment popped up (was created) or changed and is in a disputed state
   * use this state for
   */
  DISPUTED = "DISPUTED",
  /**
   * A payment popped up (was created) or changed and is in a reversed state
   * A payment has been reversed from its disputed state
   */
  REVERSED = "REVERSED",
  /**
   * A subscription has popped up (was created) or changed and it's in a inactive state
   */
  INACTIVE = "INACTIVE",
  /**
   * A subscription has popped up (was created) or changed and it's in a active state
   */
  ACTIVE = "ACTIVE",
}

/**
 * The extra info that comes from a payment event
 */
export interface IPaymentProviderPaymentExtraInfo {
  /**
   * The module where this payment is contained at
   */
  module: Module;
  /**
   * The item that contains this payment
   */
  item: ItemDefinition;
  /**
   * If the payment is part of a include, which include is it
   */
  include?: Include,
  /**
   * The payment property itself
   */
  property: PropertyDefinition;
  /**
   * The id of the row where the payment is contained
   */
  id: string;
  /**
   * The version of the row where the payment is contained
   */
  version: string;
  /**
   * The original status of the payment before the new data
   * had come into effect
   * this will be null if it was created
   */
  originalStatus: PaymentStatusType;
  /**
   * The original metadata of the payment before the new metadata
   * had come into effect
   * this will be null if it was created
   */
  originalMetadata: string;
  /**
   * The original SQL data of the payment row where it was contained
   * before the changes of status had come into effect
   * this will be null if it was created
   */
  originalSQLData: ISQLTableRowValue;
  /**
   * The unique identifier of this payment regarding its location to
   * the database
   */
  uuid: string;
}

/**
 * @ignore
 * 1 way to set the hidden metadata
 */
type SetHiddenMetadataAsJSONType = (attr: string, value: any) => void;
/**
 * @ignore
 * 2 way to set the hidden metadata
 */
type SetHiddenMetadataAsJSONType2 = (value: any) => void;

/**
 * This interface extends the original extra info, but allows for the setting
 * of the hidden metadata and contains the hidden metadata within itself
 */
export interface IPaymentProviderPaymentExtraInfoWithHiddenMetadata extends IPaymentProviderPaymentExtraInfo {
  /**
   * The original hidden metadata that was contained before the event
   * had occurred
   */
  originalHiddenMetadata: string;
  /**
   * Provides the current up to date hidden metadata
   */
  getHiddenMetadata: () => string;
  /**
   * Sets the hidden metadata value
   */
  setHiddenMetadata: (hiddenMetadata: string) => void;
  /**
   * This function treats the hidden metadata as
   * JSON, and provides the value, note that it will
   * crash if it's invalid json
   */
  getHiddenMetadataAsJSON: (attr?: string) => any;
  /**
   * This function treats the hidden metadata as JSON
   * and sets the value of a given attribute or the whole
   * thing
   */
  setHiddenMetadataAsJSON: SetHiddenMetadataAsJSONType | SetHiddenMetadataAsJSONType2;
}

/**
 * This is the whole event object of the payment and contains everything regarding
 * the hidden metadata and original data as well as the event information and payment
 * object itself that is into action
 */
export interface IPaymentEventObject extends IPaymentProviderPaymentExtraInfoWithHiddenMetadata {
  /**
   * This is the event type that was triggered
   */
  event: PaymentEvent;
  /**
   * And this is the new payment object as it is right now
   */
  payment: IPropertyDefinitionSupportedPaymentType;
}

/**
 * Represents a payment event listener that is added to the payment provider
 * in the addEventListener interaction
 * 
 * Note that you can return a promise and this will affect the way hidden metadata is handled
 * you cannot process hidden metadata asynchroniously unless you return a promise, node
 * needs to know when the event is done to perform cleanup functions
 */
export type PaymentEventListener = (evObj: IPaymentEventObject) => Promise<void> | void;

/**
 * Represents the break down of an UUID to realize
 * where in the database the payment is located
 */
export interface IPaymentUniqueLocation {
  /**
   * The id of the row where it is located
   */
  id: string;
  /**
   * The version of the row where it is located
   */
  version: string;
  /**
   * The item where it is located at
   */
  item: ItemDefinition | string;
  /**
   * The include where it is located at that item
   */
  include?: Include | string;
  /**
   * And the property itself
   */
  property: PropertyDefinition | string;
};

/**
 * Represents all the listeners for all the events
 * @ignore
 */
type PaymentListeners = Record<PaymentEvent, PaymentEventListener[]>;

/**
 * Provides a conversion between a status change or status creation
 * to an event type, it's pretty much a 1 to 1, there are of course
 * the events CREATED and DESTROYED, but those are not status changes
 */
export const statusToEvents: Record<PaymentStatusType, PaymentEvent> = {
  [PaymentStatusType.ACTIVE]: PaymentEvent.ACTIVE,
  [PaymentStatusType.INACTIVE]: PaymentEvent.INACTIVE,
  [PaymentStatusType.DISPUTED]: PaymentEvent.DISPUTED,
  [PaymentStatusType.PAID]: PaymentEvent.PAID,
  [PaymentStatusType.REVERSED]: PaymentEvent.REVERSED,
  [PaymentStatusType.PENDING]: PaymentEvent.PENDING,
}

/**
 * Represents the base payment provider and every payment provider
 * to be implemented should extend this one to ensure compatibility
 * with whatever code is generated
 */
export default class PaymentProvider<T> extends ServiceProvider<T> {

  /**
   * Provides the type of the service provider, for the payment
   * provider this is a local type as it runs locally in every
   * cluster
   * @returns LOCAL
   */
  public static getType() {
    return ServiceProviderType.LOCAL;
  }

  /**
   * Represents the list of listeners that were
   * appended to the provider
   */
  private listeners: PaymentListeners = {
    CREATED: [],
    DESTROYED: [],
    PENDING: [],
    PAID: [],
    DISPUTED: [],
    REVERSED: [],
    INACTIVE: [],
    ACTIVE: [],
  };

  /**
   * Represents a current state for the processing of the hidden
   * metadata, the hidden metadata can be of use for the payment
   * events in order to change whatever data is stored in it
   */
  private hiddenMetadataProcessing: {
    [uuid: string]: string;
  } = {};

  /**
   * Sets the hidden metadata without processing it into the database
   * and storing it as a value
   * @param uuid the uuid to set the hidden metadata for
   * @param hiddenMetadata the hidden metadata itself
   */
  private setHiddenMetadataAtWithoutProcessing(uuid: string, hiddenMetadata: string) {
    this.hiddenMetadataProcessing[uuid] = hiddenMetadata;
  }

  /**
   * Sets the hidden metadata without processing it into the database
   * but it uses a JSON mechanism instead
   * @param uuid the uuid to set the hidden metadata for
   * @param valueOrAttr the value or the attribute to se tthe thing for
   * @param value the value itself, if not present then the previous will
   * be considered the whole value
   */
  private setHiddenMetadataAtWithoutProcessingJSON(uuid: string, valueOrAttr: any, value?: any) {
    // if the value is not undefined
    if (typeof value !== "undefined") {
      // then we need to consider this the attribute
      const attr = valueOrAttr.toString() as string;
      // now we can get the whole stored value current
      const newValue = this.getHiddenMetadataInBetweenProcessingJSON(uuid) || {};
      // and set that attribute
      newValue[attr] = value;
      // and now we can set the hidden metadata
      this.setHiddenMetadataAtWithoutProcessingJSON(uuid, newValue);
      return;
    }

    // however if we don't have a value and we are setting the whole
    // if the value is null then
    if (valueOrAttr === null) {
      // set the whole thing to null
      this.setHiddenMetadataAtWithoutProcessing(uuid, null);
    } else {
      // otherwise JSON stringify it
      this.setHiddenMetadataAtWithoutProcessing(uuid, JSON.stringify(valueOrAttr));
    }
  }

  /**
   * Provides the hidden metadata in between the processing of it
   * for a given uuid
   * @param uuid the uuid to get the hidden metadata for
   * @returns a string that represents the hidden metadata
   */
  private getHiddenMetadataInBetweenProcessing(uuid: string) {
    return this.hiddenMetadataProcessing[uuid];
  }

  /**
   * Provides the hidden metadata in between the processing of it
   * for a given uuid and it parses it into JSON
   * @param uuid the uuid to get the hidden metadata for
   * @param attr an optional attribute to only get for
   * @returns a string that represents the hidden metadata
   */
  private getHiddenMetadataInBetweenProcessingJSON(uuid: string, attr?: string) {
    // if we have no hidden metadata
    const hiddenMetadataValue = this.hiddenMetadataProcessing[uuid];
    if (hiddenMetadataValue === null || typeof hiddenMetadataValue === "undefined") {
      // we give undefined back
      return;
    }
    // otherwise we are going to parse such a thing
    const parsed = JSON.parse(hiddenMetadataValue);
    // and if we have an attribute we give it as the final
    return typeof attr !== "undefined" && attr !== null ? parsed[attr] : parsed;
  }

  /**
   * Processes the hidden metadata into the database and returns the stored value
   * @param uuid the uuid to process the hidden metadata for
   * @param originalValueToCompareAgainst the original value to compare against if equal
   * it will not attempt any changes
   * @returns the stored value
   */
  private async processSettingOfHiddenMetadataAt(uuid: string, originalValueToCompareAgainst?: string) {
    // let's get the stored value we got
    const storedValue = this.hiddenMetadataProcessing[uuid];
    delete this.hiddenMetadataProcessing[uuid];

    // if we have a value to compare against let's use it
    if (typeof originalValueToCompareAgainst !== "undefined" && originalValueToCompareAgainst === storedValue) {
      return originalValueToCompareAgainst;
    }

    // now we can get the real location for the uuid
    const location = this.unwrapUUIDFor(uuid);

    // gather the prefix
    const prefix: string = location.include ? (location.include as Include).getPrefixedQualifiedIdentifier() : "";

    // now we can get the hidden metadata row
    const hiddenMetadataRow = paymentSQLHiddenMetadataRow(prefix, (location.property as PropertyDefinition).getId());

    // peform a silent update, hidden metadata is always fetched on
    // update of the row, this means it doesn't need to be informed
    // this makes it an efficient update that does not
    // bother other clusters
    await this.localAppData.rawDB.performRawDBUpdate(
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

    return storedValue;
  }

  /**
   * Sets the hidden metadata at a given payment uuid
   * @param uuid the uuid to store the hidden metadata at
   * @param hiddenMetadata the new hidden metadata value
   * @returns the hidden metadata value that was stored
   */
  public async setHiddenMetadataAt(uuid: string, hiddenMetadata: string) {
    this.setHiddenMetadataAtWithoutProcessing(uuid, hiddenMetadata);
    return this.processSettingOfHiddenMetadataAt(uuid);
  }

  /**
   * Provides an uuid for a given payment event
   * this uuid is related to the space that this payment is taking in
   * the row of the database and it's unique for that payment object
   * @param info 
   */
  public getUUIDFor(info: IPaymentProviderPaymentExtraInfo | IPaymentUniqueLocation) {
    // let's unwrap these values into proper instances
    const itemDef = typeof info.item === "string" ?
      this.localAppData.root.registry[info.item] as ItemDefinition : info.item;
    const include = info.include ? (
      typeof info.include === "string" ?
        itemDef.getIncludeFor(info.include) : info.include
    ) : null;
    const propDef = typeof info.property === "string" ? (
      include ? include.getSinkingPropertyFor(info.property) : itemDef.getPropertyDefinitionFor(info.property, true)
    ) : info.property;

    // now we can build the UUID into its form
    // the row id +
    // the version
    // the property defintion id
    // the include if (if any)
    // and the item definition table
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
    // first we split the whole thing into its
    // dots
    const splitted = uuid.split(".");

    // now we need to get these
    let id: string;
    let version: string;
    let propertyId: string;
    let includeId: string;
    let itemQualifiedName: string;
    // for the ones with 5 this means it has a include
    if (splitted.length === 5) {
      id = splitted[0];
      version = splitted[1] || null;
      propertyId = splitted[2];
      includeId = splitted[3];
      itemQualifiedName = splitted[4];
    // the ones with 4 don't have a include
    } else if (splitted.length === 4) {
      id = splitted[0];
      version = splitted[1] || null;
      propertyId = splitted[2];
      itemQualifiedName = splitted[3];
    } else {
      throw new Error("Invalid uuid " + uuid);
    }

    // now we can get these
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
   * @returns the end value of the hidden metadata row as stored
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
    return this.processSettingOfHiddenMetadataAt(info.uuid, hiddenMetadata);
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
      appData: this.localAppData,
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
    await this.localAppData.cache.requestUpdate(
      paymentObject.item,
      paymentObject.location.id,
      paymentObject.location.version,
      paymentObject.include ? {
        [paymentObject.include.getQualifiedIdentifier()]: update,
      } : update,
      {
        ignorePreSideEffects: true,
        language: "en",
        dictionary: "simple",
      }
    );
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
   * this allows the developer to issue a refund based on an invoice payment and a refund
   * payment
   * 
   * @param invoicePaymentUUID required the invoice payment that needs to be reverted into
   * a refund
   * @param refundPaymentUUID an optional (null allowed) refund payment type that represents
   * the reversal of the action
   * @param extras extra information to aid into the refund process
   * @param extras.knownInvoicePaymentRowValue if you know the row value of the invoice add it here
   * @param extras.knownRefundPaymentRowValue if you know the row value of the refund add it here
   * @override
   */
  public executeRefund(
    invoicePaymentUUID: string,
    refundPaymentUUID: string,
    extras: {
      knownInvoicePaymentRowValue?: ISQLTableRowValue;
      knownRefundPaymentRowValue?: ISQLTableRowValue;
      [key: string]: any;
    } = {}
  ) {

  }

  /**
   * A simple function for custom functionality
   * @param fn the function to execute
   * @param arg the argument to pass at it
   * @override
   */
  public custom(
    fn: string,
    arg: any,
  ) {
    
  }
}
