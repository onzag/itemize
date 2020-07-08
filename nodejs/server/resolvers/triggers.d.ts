import { IGQLValue, IGQLArgs } from "../../gql-querier";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "..";
import Module from "../../base/Root/Module";
export declare enum TriggerActions {
    CREATE = 0,
    CREATED = 1,
    EDIT = 2,
    DELETE = 3
}
export interface TriggerArgType {
    appData: IAppDataType;
    from: IGQLValue;
    update: IGQLArgs;
    extraArgs: IGQLArgs;
    itemDefinition: ItemDefinition;
    module: Module;
    action: TriggerActions;
    id: number;
    version: string;
}
export declare type TriggerType = (arg: TriggerArgType) => IGQLValue | Promise<IGQLValue>;
export interface IBaseTriggerRegistry {
    [path: string]: TriggerType;
}
export interface ITriggerRegistry {
    module?: IBaseTriggerRegistry;
    itemDefinition?: IBaseTriggerRegistry;
}
