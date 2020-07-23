import { IGQLValue, IGQLArgs } from "../../gql-querier";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { IAppDataType } from "..";
import Module from "../../base/Root/Module";

export enum TriggerActions {
  CREATE,
  CREATED,
  EDIT,
  EDITED,
  DELETE,
  DELETED,
  GET,
}

export interface TriggerArgType {
  appData: IAppDataType;
  value: IGQLValue;
  update: IGQLArgs;
  extraArgs: IGQLArgs;
  itemDefinition: ItemDefinition;
  module: Module;
  action: TriggerActions;
  id: number;
  version: string;
  user: {
    role: string;
    id: number;
  },
  forbid: (message: string) => void;
}

export type TriggerType = (arg: TriggerArgType) => IGQLValue | Promise<IGQLValue>;

export interface IBaseTriggerRegistry {
  [path: string]: TriggerType;
}

export interface ITriggerRegistry {
  module?: IBaseTriggerRegistry,
  itemDefinition?: IBaseTriggerRegistry,
}