import { IRQValue, IRQArgs, IRQSearchRecordsContainer, IRQSearchResultsContainer } from "../../rq-querier";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "..";
import Module from "../../base/Root/Module";
import { WhereBuilder } from "../../database/WhereBuilder";
import { ISQLTableRowValue } from "../../base/Root/sql";
import type { ElasticQueryBuilder } from "../elastic";
import type { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { EndpointErrorType } from "../../base/errors";

export enum IOTriggerActions {
  CREATE,
  CREATED_SYNC,
  CREATED,
  EDIT,
  EDITED_SYNC,
  EDITED,
  DELETE,
  DELETED_SYNC,
  DELETED,
  READ,
}

export enum SearchTriggerActions {
  SEARCH,
  SEARCHED_SYNC,
  SEARCHED,
}

export interface IOTriggerArgType<TSQL = ISQLTableRowValue, TRQ = IRQValue, TSQLParent = ISQLTableRowValue> {
  /**
   * The language that was used
   */
  language: string;
  /**
   * The dictionary that was obtained from the language
   */
  dictionary: string;
  /**
   * App data of the entire application
   */
  appData: IAppDataType;
  /**
   * the current value that the database is hosting
   */
  originalValue: TRQ;
  /**
   * The original value in sql form
   */
  originalValueSQL: TSQL;
  /**
   * whether the original value is blocked
   */
  originalValueBlocked: boolean;
  /**
   * the new value that it is hosting usually only available
   * on done requests
   */
  newValue: TRQ;
  /**
   * The new value when sql is done
   */
  newValueSQL: TSQL;
  /**
   * whether the new value is blocked
   */
  newValueBlocked: boolean;
  /**
   * A partial arg based update for the value, remember this is a partial
   * value
   */
  requestedUpdate: IRQArgs;
  /**
   * The creator for the requested update
   * only truly exists during an add action and represents
   * the expected creator
   * might differ from the current user if create in behalf is active
   */
  requestedUpdateCreatedBy: string;
  /**
   * The parent for the requested update
   * only truly exists during an add and edit action and represents
   * the expected parent or the new parent
   * might differ from the current user if create in behalf is active
   */
  requestedUpdateParent: {
    id: string;
    version: string;
    type: string;
    value: TSQLParent;
  }
  /**
   * Whether the requested update is trying to set the state
   * to blocked
   */
  requestedUpdateToBlock: boolean;
  /**
   * Whether the requested update is trying to set the state
   * to blocked
   */
  requestedUpdateToUnblock: boolean;
  /**
   * Arguments that are not part of the patch that were passed to rq
   */
  extraArgs: IRQArgs;
  /**
   * the item definition in question
   */
  itemDefinition: ItemDefinition;
  /**
   * The module in question
   */
  module: Module;
  /**
   * The action being ran
   */
  action: IOTriggerActions;
  /**
   * The id of the item we are working with, it is null for
   * CREATE, but it is set for CREATED and others
   */
  id: string;
  /**
   * The version of the item we are working with, it is null for
   * CREATE, but it is set for CREATED and others
   */
  version: string;
  /**
   * The user we are working with
   */
  user: {
    role: string;
    id: string;
    customData: any;
  },
  /**
   * A custom id that might be provided during adding events
   * this is when the user specifies their own id
   * to use during a custom id event
   */
  customId: string;
  /**
   * Causes the request to be forbidden
   */
  forbid: (message: string, customCode?: string, data?: any) => void;
  /**
   * Changes the id that will be used in a CREATE event
   */
  setForId: (id: string) => void;
  /**
   * Changes the version that will be used in a CREATE event
   */
  setVersion: (version: string) => void;
  /**
   * a trigger cache you may freely use to store arbitrary values during the run
   */
  triggerCache: {[key: string]: any};
}

export interface ISearchTriggerArgType<TSQL = ISQLTableRowValue, TRQ = IRQValue> {
  /**
   * The action being ran
   */
  action: SearchTriggerActions;
  /**
   * The dictionary that was obtained from the language
   */
  dictionary: string;
  language: string;
  appData: IAppDataType;
  itemDefinition: ItemDefinition;
  module: Module;
  args: IRQArgs;
  user: {
    role: string;
    id: string;
    customData: any;
  };
  usesElastic: boolean;
  whereBuilder: WhereBuilder;
  elasticQueryBuilder: ElasticQueryBuilder;
  sqlResponse: TSQL[];
  elasticResponse: SearchResponse;
  traditional: boolean;
  records: IRQSearchRecordsContainer,
  results: IRQSearchResultsContainer<TRQ>,
  forbid: (message: string, customCode?: string, data?: any) => void;
  setSearchMetadata: (metadata: string) => void;
}

export interface IOConflictTriggerArgType<TSQL = ISQLTableRowValue> {
  /**
   * Feel free to modify the error this is a modifiable event the prupose
   * of the trigger is to add data into this error before is sent
   */
  error: EndpointErrorType;
  /**
   * The row, may be available if it was checked against, some errors
   * have no row data
   */
  row: TSQL;
}

export type IOTriggerType<TSQL = ISQLTableRowValue, TRQ = IRQValue, TSQLParent = ISQLTableRowValue> =
  (arg: IOTriggerArgType<TSQL, TRQ, TSQLParent>) => IRQValue | Promise<IRQValue> | IRQArgs | Promise<IRQArgs>;
export type SearchTriggerType<TSQL = ISQLTableRowValue> = (arg: ISearchTriggerArgType<TSQL>) => void | Promise<void>;

/**
 * return true to overwrite
 * false to throw the error
 */
export type IOConflictTriggerType = (arg: IOConflictTriggerArgType) => void | boolean | Promise<void | boolean>;

export interface IBaseTriggerRegistry {
  io?: {
    [path: string]: IOTriggerType;
  },
  search?: {
    [path: string]: SearchTriggerType;
  },
  ioConflict?: {
    [path: string]: IOConflictTriggerType;
  }
}

export interface ITriggerRegistry {
  module?: IBaseTriggerRegistry,
  item?: IBaseTriggerRegistry,
}

function fixPaths<T>(src: T): T {
  const output: any = {};
  Object.keys(src).forEach((key) => {
    let actualPathKey = key;
    if (actualPathKey.startsWith("/")) {
      actualPathKey.substr(1);
    }
    if (actualPathKey.endsWith("/")) {
      actualPathKey.substr(0, actualPathKey.length - 1);
    }
    output[actualPathKey] = src[key];
  });
  return output;
}

function mergeioConflictTriggers(
  triggerA: IOConflictTriggerType,
  triggerB: IOConflictTriggerType,
) {
  if (!triggerA) {
    return triggerB;
  } else if (!triggerB) {
    return triggerA;
  }

  const mergedTrigger: IOConflictTriggerType = async (arg) => {
    const overwrite1 = await triggerA(arg);
    const overwrite2 = await triggerB(arg);

    return (overwrite1 && overwrite2);
  }

  return mergedTrigger;
}

function mergeIOTriggers(
  triggerA: IOTriggerType,
  triggerB: IOTriggerType,
): IOTriggerType {
  if (!triggerA) {
    return triggerB;
  } else if (!triggerB) {
    return triggerA;
  }

  const mergedTrigger: IOTriggerType = async (arg) => {
    const triggerAResult = await triggerA(arg);
    if (triggerAResult) {
      const triggerBResult = await triggerB({
        ...arg,
        requestedUpdate: triggerAResult,
      });

      if (triggerBResult) {
        return triggerBResult;
      }

      return triggerAResult;
    } else {
      return await triggerB(arg);
    }
  }

  return mergedTrigger;
}

function mergeSearchTriggers(
  triggerA: SearchTriggerType,
  triggerB: SearchTriggerType,
): SearchTriggerType {
  if (!triggerA) {
    return triggerB;
  } else if (!triggerB) {
    return triggerA;
  }

  const mergedTrigger: SearchTriggerType = async (arg) => {
    await triggerA(arg);
    await triggerB(arg);
  }

  return mergedTrigger;
}


export function mergeTriggerRegistries(
  ...triggers: ITriggerRegistry[]
) {
  const final: ITriggerRegistry = {
    item: {
      io: {},
      search: {},
      ioConflict: {},
    },
    module: {
      io: {},
      search: {},
      ioConflict: {},
    },
  };

  triggers.forEach((t) => {

    if (t === null || typeof t === "undefined") {
      return;
    }

    const iTrigger = t.item;
    const modTrigger = t.module;

    if (iTrigger) {
      if (iTrigger.io) {
        const fixed = fixPaths(iTrigger.io);
        Object.keys(fixed).forEach((path: string) => {
          final.item.io[path] = mergeIOTriggers(
            final.item.io[path],
            fixed[path],
          );
        });
      }
      if (iTrigger.search) {
        const fixed = fixPaths(iTrigger.search);
        Object.keys(fixed).forEach((path: string) => {
          final.item.search[path] = mergeSearchTriggers(
            final.item.search[path],
            fixed[path],
          );
        });
      }
      if (iTrigger.ioConflict) {
        const fixed = fixPaths(iTrigger.ioConflict);
        Object.keys(fixed).forEach((path: string) => {
          final.item.ioConflict[path] = mergeioConflictTriggers(
            final.item.ioConflict[path],
            fixed[path],
          );
        });
      }
    }

    if (modTrigger) {
      if (modTrigger.io) {
        const fixed = fixPaths(modTrigger.io);
        Object.keys(fixed).forEach((path: string) => {
          final.module.io[path] = mergeIOTriggers(
            final.module.io[path],
            fixed[path],
          );
        });
      }
      if (modTrigger.search) {
        const fixed = fixPaths(modTrigger.search);
        Object.keys(fixed).forEach((path: string) => {
          final.module.search[path] = mergeSearchTriggers(
            final.module.search[path],
            fixed[path],
          );
        });
      }
      if (modTrigger.ioConflict) {
        const fixed = fixPaths(modTrigger.ioConflict);
        Object.keys(fixed).forEach((path: string) => {
          final.module.ioConflict[path] = mergeioConflictTriggers(
            final.module.ioConflict[path],
            fixed[path],
          );
        });
      }
    }
  });

  return final;
}
