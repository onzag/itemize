import type { IPingInfo } from "../../../server/redis";
import type { IEnvironmentInfo } from "../../../server/environment";
import type { IDBConfigRawJSONDataType, ISingleRedisConfigRawJSONDataType } from "../../../config";
import equals from "deep-equal";
import { TokenContext } from "../../internal/providers/token-provider";
import ResourceLoader from "../resources/ResourceLoader";
import React, { useEffect, useState } from "react";
import { loadLib, parseDate } from "../../../util";
import ReactDOM from "react-dom";


interface INodeInfo { cpuUsage: NodeJS.CpuUsage, memoryUsage: NodeJS.MemoryUsage };

interface INode {
  type: string;
  label: string;
  id: string;
  group: string;
}

interface IPGNode extends INode {
  type: "PG",
  config: IDBConfigRawJSONDataType;
}

interface IRedisNode extends INode {
  type: "REDIS";
  global: boolean;
  cluster: boolean;
  pubSub: boolean;
  config: ISingleRedisConfigRawJSONDataType;
}

const labels = {
  "EXTENDED": "Cluster node",
  "CLUSTER_MANAGER": "Cluster manager",
  "GLOBAL_MANAGER": "Global manager",
  "ABSOLUTE": "Absolute (development)",
}

interface IBasicNode extends INode {
  type: "EXTENDED" | "CLUSTER_MANAGER" | "ABSOLUTE" | "GLOBAL_MANAGER";
  isSelf: boolean;
  dead: boolean;
}

type IFinalNode = IBasicNode | IRedisNode | IPGNode;

interface IConnection {
  source: string;
  target: string;
  value: number;
  type: "network" | "softlink" | "deadlink";
}

function getPGId(d: IDBConfigRawJSONDataType) {
  return "PG_" + d.host + "." + d.port + "." + d.database + "." + d.user;
}

function getRedisId(d: ISingleRedisConfigRawJSONDataType) {
  return "REDIS_" + d.host + "." + d.port + "." + d.db + "." + d.path;
}

const memoizedNodes: IFinalNode[] = [];
const memoizedConnections: IConnection[] = [];

export function getGraphFromClusterInfo(self: any, pings: IPingInfo<IEnvironmentInfo, INodeInfo>[]) {
  const graphResult: IFinalNode[] = [];
  const graphConnections: IConnection[] = [];

  // first let's find the database(s)
  const allPostgreSQL = pings.map((r) => r.data.postgresql);
  // remove all duplicates
  allPostgreSQL.filter((item, pos) => {
    return allPostgreSQL.findIndex((item2) => equals(item2, item, { strict: true })) === pos;
  }).forEach((database, i, arr) => {
    graphResult.push({
      type: "PG",
      id: getPGId(database),
      label: "PostgreSQL database",
      config: database,
      group: "PG",
    });

    // all database are meant to be connected because they are replicas
    arr.forEach((database2) => {
      // cannot connect to itself
      if (database === database2) {
        return;
      }

      graphConnections.push({
        source: getPGId(database),
        target: getPGId(database2),
        value: 1,
        type: "softlink",
      });
    });
  });

  // now let's find all redis
  const allRedis = pings.map((r) => [r.data.redisCache, r.data.redisGlobal, r.data.redisPubSub]).flat();
  allRedis.filter((item, pos) => {
    return allRedis.findIndex((item2) => equals(item2, item, { strict: true })) === pos;
  }).forEach((redis, i, arr) => {
    const baseNode: IRedisNode = {
      type: "REDIS",
      id: getRedisId(redis),
      label: "Redis Cache",
      config: redis,
      cluster: false,
      global: false,
      pubSub: false,
      group: "REDIS",
    };

    pings.forEach((ele) => {
      if (!baseNode.global && equals(ele.data.redisGlobal, redis, { strict: true })) {
        baseNode.global = true;
        baseNode.label += " [GLOBAL]";
      }
      if (!baseNode.cluster && equals(ele.data.redisCache, redis, { strict: true })) {
        baseNode.cluster = true;
        baseNode.label += " [CLUSTER]";
      }
      if (!baseNode.pubSub && equals(ele.data.redisPubSub, redis, { strict: true })) {
        baseNode.pubSub = true;
        baseNode.label += " [PUBSUB]";
      }
    });

    graphResult.push(baseNode);
  });

  // and now let's get the servers themselves
  pings.forEach((s) => {
    const resultNode: IBasicNode = {
      isSelf: s.dataKey === self.INSTANCE_UUID,
      id: s.dataKey,
      type: s.data.environment.INSTANCE_MODE as any,
      label: labels[s.data.environment.INSTANCE_MODE] + " [" + s.data.environment.INSTANCE_GROUP_ID + "]",
      group: s.data.environment.INSTANCE_GROUP_ID,
      dead: false,
    }

    const isDead = s.assumeDead || s.isDead;
    if (isDead) {
      resultNode.label += " [DEAD]";
      resultNode.dead = true;
    }

    graphResult.push(resultNode);

    let redisCacheId = getRedisId(s.data.redisCache);
    const redisGlobalId = getRedisId(s.data.redisGlobal);
    const redisPubSubId = getRedisId(s.data.redisPubSub);
    let databaseId = getPGId(s.data.postgresql);

    let redisCacheForce = 3;
    let redisGlobalForce = 2;
    let redisPubSubForce = 2;
    let databaseForce = 2;

    if (s.data.environment.INSTANCE_MODE === "CLUSTER_MANAGER") {
      redisCacheForce = 5;
      databaseId = null;
    } else if (s.data.environment.INSTANCE_MODE === "GLOBAL_MANAGER" || s.data.environment.INSTANCE_MODE === "ABSOLUTE") {
      redisCacheForce = 5;
      if (s.data.environment.INSTANCE_MODE === "GLOBAL_MANAGER") {
        redisCacheId = null;
      }
      redisGlobalForce = 5;
      redisPubSubForce = 5;
      databaseForce = 5;
    }

    if (redisCacheId) {
      graphConnections.push({
        target: s.dataKey,
        source: redisCacheId,
        value: redisCacheForce,
        type: isDead ? "deadlink" : "network",
      });
    }
    graphConnections.push({
      target: s.dataKey,
      source: redisGlobalId,
      value: redisGlobalForce,
      type: isDead ? "deadlink" : "network",
    });
    graphConnections.push({
      target: s.dataKey,
      source: redisPubSubId,
      value: redisPubSubForce,
      type: isDead ? "deadlink" : "network",
    });
    if (databaseId) {
      graphConnections.push({
        target: s.dataKey,
        source: databaseId,
        value: databaseForce,
        type: isDead ? "deadlink" : "network",
      });
    }
  });

  graphResult.forEach((r, index) => {
    const existantNode = memoizedNodes.find((mR) => {
      return Object.keys(r).every((k) => {
        return equals(r[k], mR[k], { strict: true });
      });
    });
    if (existantNode) {
      graphResult[index] = existantNode;
    } else {
      memoizedNodes.push(r);
    }
  });

  graphConnections.forEach((c, index) => {
    const existantConnection = memoizedConnections.find((mC) => {
      return Object.keys(c).every((k) => {
        if (k === "source" || k === "target") {
          return c[k] === (mC[k] as any).id;
        }
        return equals(c[k], mC[k], { strict: true });
      });
    });
    if (existantConnection) {
      graphConnections[index] = existantConnection;
    } else {
      memoizedConnections.push(c);
    }
  });

  return {
    nodes: graphResult,
    links: graphConnections,
  }
}

export default function AdminInterface() {
  const [isReady, setReady] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(null);

  useEffect(() => {
    (async () => {
      (window as any).React = React;
      (window as any).ReactDOM = ReactDOM;
      await loadLib("graph-library", "//unpkg.com/react-force-graph-2d", () => {
        return (window as any).ForceGraph2D;
      });
      setReady(true);
    })();
  }, [])
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
      <TokenContext.Consumer>
        {(context) => (
          <>
            <ResourceLoader
              src={"info?token=" + context.token}
              path="/rest/clusters"
              pollEvery={10}
              keepContentDuringLoading={true}
            >
              {(data: string) => {
                if (!data || !isReady) {
                  return null;
                }

                const parsedData = JSON.parse(data);

                if (parsedData.status !== "OK") {
                  return null;
                }

                const graphData = getGraphFromClusterInfo(parsedData.self, parsedData.pings);
                const ForceGraph2D = (window as any).ForceGraph2D;
                return (
                  <ForceGraph2D
                    graphData={graphData}
                    nodeLabel="label"
                    nodeColor={(n: IFinalNode) => {
                      if ((n as any).isSelf) {
                        return "#000";
                      }

                      if (n.type === "PG") {
                        return "#d50000";
                      } else if (n.type === "REDIS") {
                        return "#6200ea";
                      } else if (n.type === "GLOBAL_MANAGER") {
                        if (n.dead) {
                          return "#e8f5e9";
                        }
                        return "#a5d6a7";
                      } else if (n.type === "CLUSTER_MANAGER") {
                        if (n.dead) {
                          return "#fff3e0";
                        }
                        return "#ffcc80";
                      } else if (n.type === "EXTENDED") {
                        if (n.dead) {
                          return "#f9fbe7";
                        }
                        return "#e6ee9c";
                      } else {
                        if (n.dead) {
                          return "#eeeeee";
                        }
                        return "#616161";
                      }
                    }}
                    onNodeClick={(d: IFinalNode) => d.type === "ABSOLUTE" || d.type === "EXTENDED" || d.type === "CLUSTER_MANAGER" || d.type === "GLOBAL_MANAGER" ? setSelectedInstance(d.id) : null}
                    linkWidth={(d: IConnection) => d.type === "deadlink" ? 1 : (d.type === "network" ? 2 : 0)}
                    linkDirectionalParticles={(d: IConnection) => d.type === "network" ? d.value : 0}
                    linkDirectionalParticleSpeed={(d: IConnection) => d.type === "deadlink" ? 0 : d.value * 0.0005}
                  />
                );
              }}
            </ResourceLoader>
            <ResourceLoader
              src={"logs?token=" + context.token}
              path="/rest"
              pollEvery={10}
              keepContentDuringLoading={true}
            >
              {(data: string) => {
                if (!data) {
                  return null;
                }

                const parsedData = JSON.parse(data);

                if (parsedData.status !== "OK") {
                  return null;
                }

                const logsInstances: string[] = parsedData.ids;

                return (
                  <div style={{ position: "absolute", right: 0, width: "50%", bottom: 0 }}>
                    {logsInstances.map((i) => (
                      <button key={i} style={{ fontSize: 12, display: "block" }} onClick={setSelectedInstance.bind(null, i)}>{i}</button>
                    ))}
                  </div>
                )
              }}
            </ResourceLoader>
            {selectedInstance ? (
              <div style={{ position: "absolute", left: 0, width: "50%", height: "50%", overflow: "scroll", bottom: 0, backgroundColor: "white" }}>
                <ResourceLoader
                  src={
                    selectedInstance +
                    "?token=" +
                    context.token +
                    "&from=" + (new Date((new Date().getTime() - 86400000))).toISOString() +
                    "&to=" + (new Date((new Date().getTime() + 86400000))).toISOString()
                  }
                  path="/rest/logs/info"
                >
                  {(data: string) => {
                    if (!data) {
                      return null;
                    }

                    const parsedData = JSON.parse(data);

                    if (parsedData.status !== "OK") {
                      return null;
                    }

                    return JSON.stringify(parsedData);
                  }}
                </ResourceLoader>
              </div>
            ) : null}
          </>
        )}
      </TokenContext.Consumer>
    </div>
  );
}