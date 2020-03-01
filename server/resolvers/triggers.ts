import { IGQLValue, IGQLArgs } from "../../gql-querier";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "..";
import Module from "../../base/Root/Module";

export enum TriggerActions {
  CREATE,
  EDIT,
  DELETE,
}

export interface TriggerArgType {
  appData: IAppDataType;
  from: IGQLValue;
  update: IGQLArgs;
  extraArgs: IGQLArgs;
  itemDefinition: ItemDefinition;
  module: Module;
  action: TriggerActions
}

export type TriggerType = (arg: TriggerArgType) => IGQLValue | Promise<IGQLValue>;

export interface IBaseTriggerRegistry {
  [path: string]: TriggerType;
}

export interface ITriggerRegistry {
  module?: IBaseTriggerRegistry,
  itemDefinition?: IBaseTriggerRegistry,
}