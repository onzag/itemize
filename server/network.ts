import { ENVIRONMENT_DETAILS } from "./environment";

export interface INetworkLink {
  type: "uses-as-cluster-cache" | "uses-as-global-cache" | "uses-as-global-pubsub" |
    "uses-as-central-database" | "uses-as-search-database";
  id: string;
}

export interface INetworkNode {
  nodeId: string;
  name: string;
  links: INetworkLink[];
  groupId: string;
}

export interface INetworkServerNode extends INetworkNode {
  type: "extended" | "cluster-manager" | "global-manager-absolute" | "global-manager-services" |
  "global-manager-elastic" | "global-manager-server-data" | "global-manager-service-x" | "absolute";
  envData: typeof ENVIRONMENT_DETAILS;
  instanceId: string;
  createdAt: string;
  alive: boolean;
  lastHeard: string;
}

export interface INetworkDbNode extends INetworkNode {
  type: "elastic" | "redis" | "pg";
  host: string;
}

export interface INetwork {
  nodes: Array<INetworkDbNode | INetworkNode>;
}