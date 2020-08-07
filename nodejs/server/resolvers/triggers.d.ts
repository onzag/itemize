import { IGQLValue, IGQLArgs } from "../../gql-querier";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "..";
import Module from "../../base/Root/Module";
export declare enum IOTriggerActions {
    CREATE = 0,
    CREATED = 1,
    EDIT = 2,
    EDITED = 3,
    DELETE = 4,
    DELETED = 5,
    GET = 6
}
export interface IOTriggerArgType {
    appData: IAppDataType;
    value: IGQLValue;
    update: IGQLArgs;
    extraArgs: IGQLArgs;
    itemDefinition: ItemDefinition;
    module: Module;
    action: IOTriggerActions;
    id: number;
    version: string;
    user: {
        role: string;
        id: number;
        customData: any;
    };
    forbid: (message: string) => void;
}
export interface ISearchTriggerArgType {
    appData: IAppDataType;
    itemDefinition: ItemDefinition;
    module: Module;
    args: IGQLArgs;
    user: {
        role: string;
        id: number;
        customData: any;
    };
    forbid: (message: string) => void;
}
export declare type IOTriggerType = (arg: IOTriggerArgType) => IGQLValue | Promise<IGQLValue>;
export declare type SearchTriggerType = (arg: ISearchTriggerArgType) => void | Promise<void>;
export interface IBaseTriggerRegistry {
    io?: {
        [path: string]: IOTriggerType;
    };
    search?: {
        [path: string]: SearchTriggerType;
    };
}
export interface ITriggerRegistry {
    module?: IBaseTriggerRegistry;
    itemDefinition?: IBaseTriggerRegistry;
}
export declare function mergeTriggerRegistries(...triggers: ITriggerRegistry[]): ITriggerRegistry;
