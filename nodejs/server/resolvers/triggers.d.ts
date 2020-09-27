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
    READ = 6
}
export interface IOTriggerArgType {
    /**
     * App data of the entire application
     */
    appData: IAppDataType;
    /**
     * the current value that the database is hosting, this value is total
     * it will be null for CREATE and CREATED
     */
    value: IGQLValue;
    /**
     * A partial arg based update for the value, remember this is a partial
     * value
     */
    update: IGQLArgs;
    /**
     * Arguments that are not part of the patch that were passed to graphql
     */
    extraArgs: IGQLArgs;
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
    id: number;
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
        id: number;
        customData: any;
    };
    /**
     * Causes the request to be forbidden
     */
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
