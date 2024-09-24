import type { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import { CLUSTER_ID, INSTANCE_MODE, NODE_ENV } from "./environment";
import { logger } from "./logger";
import { httpRequest } from "./request";
import StorageProvider from "./services/base/StorageProvider";

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export async function checkClusterSanityBeforeListen(
  sensitiveConfig: ISensitiveConfigRawJSONDataType,
  config: IConfigRawJSONDataType,
  buildnumber: string,
): Promise<boolean> {
  const baseDomain = NODE_ENV === "development" ? config.developmentHostname : config.productionHostname;

  if (!config.allClusters.includes(config.defaultCluster)) {
    logger.error({
      message: "The configuration for the clusters is invalid as the default cluster is not contained in the list of all clusters",
      methodName: "checkClusterSanity",
      data: {
        clusterId: CLUSTER_ID,
        selfBuildNumber: buildnumber,
      }
    });
    return false;
  }

  for (const clusterId of config.allClusters) {
    if (!sensitiveConfig.clusters[clusterId]) {
      logger.error({
        message: "The configuration for the clusters is invalid as one of the clusters from allClusters is not contained in the sensitive config",
        methodName: "checkClusterSanity",
        data: {
          clusterId: CLUSTER_ID,
          otherClusterId: clusterId,
          selfBuildNumber: buildnumber,
        }
      });
      return false;
    }

    if (clusterId === CLUSTER_ID) {
      continue;
    }

    const otherClusterHost = sensitiveConfig.clusters[clusterId].hostname;

    try {
      const buildNumberFromServer = await httpRequest({
        host: otherClusterHost,
        isHttps: true,
        method: "GET",
        path: "/rest/buildnumber",
        returnNonOk: true,
        maxAttempts: 3,
        maxAttemptsRetryTime: 1000,
      });

      if (buildNumberFromServer.data.toString().trim() !== buildnumber) {
        logger.error({
          message: "Cluster has a buildnumber mismatch with the other cluster, you need to shut down all active clusters before initializing new ones",
          methodName: "checkClusterSanity",
          data: {
            clusterId: CLUSTER_ID,
            otherClusterId: clusterId,
            selfBuildNumber: buildnumber,
            otherBuildNumber: buildNumberFromServer,
          }
        });
        return false;
      }
    } catch (err) {
      logger.info({
        message: "Cluster at " + otherClusterHost + " must be offline as it doesn't reply after 3 tries",
        methodName: "checkClusterSanity",
        data: {
          clusterId: CLUSTER_ID,
          defaulCluster: config.defaultCluster,
          buildnumber,
        }
      });
    }
  }

  // can't check these since these checks only apply to extended instances, global and cluster
  // can be not sharing and being their own cluster
  if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "CLUSTER_MANAGER") {
    return true;
  }

  if (config.defaultCluster === CLUSTER_ID) {
    logger.info({
      message: "I am the default cluster",
      methodName: "checkClusterSanity",
      data: {
        clusterId: CLUSTER_ID,
        defaulCluster: config.defaultCluster,
        buildnumber,
      }
    });
  }

  let clusterHostname: string = null;

  if (sensitiveConfig.clusters[CLUSTER_ID]?.hostname) {
    clusterHostname = sensitiveConfig.clusters[CLUSTER_ID].hostname;

    logger.info({
      message: "My assigned hostname is " + clusterHostname,
      methodName: "checkClusterSanity",
      data: {
        clusterId: CLUSTER_ID,
        defaulCluster: config.defaultCluster,
        buildnumber,
      }
    });

    if (clusterHostname === baseDomain && config.allClusters.length > 1) {
      logger.error({
        message: "This is the same as the base domain however I am not the only valid cluster, therefore this setup is invalid",
        methodName: "checkClusterSanity",
        data: {
          clusterId: CLUSTER_ID,
          defaulCluster: config.defaultCluster,
          buildnumber,
        }
      });
      return false;
    }
  } else {
    logger.info({
      message: "I can't find a valid host where I reside",
      methodName: "checkClusterSanity",
      data: {
        clusterId: CLUSTER_ID,
        defaulCluster: config.defaultCluster,
        buildnumber,
        clusters: sensitiveConfig.clusters,
      }
    });
    return false;
  }

  return true;
}

export async function checkClusterSanityAfterListen(
  sensitiveConfig: ISensitiveConfigRawJSONDataType,
  config: IConfigRawJSONDataType,
  storageProvider: StorageProvider<any>,
  buildnumber: string,
): Promise<boolean> {
  // can't check these since these checks only apply to extended instances, global and cluster
  // can be not sharing and being their own cluster
  if (INSTANCE_MODE === "GLOBAL_MANAGER" || INSTANCE_MODE === "CLUSTER_MANAGER") {
    return true;
  }

  const clusterHostname = sensitiveConfig.clusters[CLUSTER_ID].hostname;

  while (true) {
    try {
      const uuidFromServer = await httpRequest({
        host: clusterHostname,
        isHttps: true,
        method: "GET",
        path: "/uploads/" + CLUSTER_ID + "/uuid",
        returnNonOk: true,
      });

      const ownUuid = await storageProvider.getOwnStorageUuid();

      if (uuidFromServer.response.statusCode === 200) {
        if (uuidFromServer.data !== ownUuid) {
          logger.error({
            message: "Cluster response of the storage id is mismatching, this is not the same cluster environment as they are not using the same storage",
            methodName: "checkClusterSanity",
            serious: true,
            data: {
              clusterId: CLUSTER_ID,
              defaulCluster: config.defaultCluster,
              buildnumber,
              clusterHostname,
              uuidFromServer: uuidFromServer.data,
              ownUuid: ownUuid,
            }
          });
          return false;
        }
        break;
      } else {
        logger.error({
          message: "Did communicate with server but it returned invalid status code for response, is the cluster healthy?... retrying in 2s",
          methodName: "checkClusterSanity",
          serious: true,
          data: {
            clusterId: CLUSTER_ID,
            defaulCluster: config.defaultCluster,
            buildnumber,
            clusterHostname,
            uuidFromServer: uuidFromServer.data,
            ownUuid,
          }
        });
        await wait(2000);
      }
    } catch (err) {
      logger.error({
        message: "Cluster cannot communicaty with itself by the given domain at: " + clusterHostname + ", is the cluster healthy?..." +
          (NODE_ENV === "development" ? "" : " retrying in 2s"),
        methodName: "checkClusterSanity",
        err,
        serious: true,
        data: {
          clusterId: CLUSTER_ID,
          defaulCluster: config.defaultCluster,
          buildnumber,
          clusterHostname,
        }
      });
      if (NODE_ENV === "development") {
        logger.info({
          message: "Cluster will allow itself to keep going because it's in development mode, so it assumes things are flowing through localhost",
          methodName: "checkClusterSanity",
          data: {
            clusterId: CLUSTER_ID,
            defaulCluster: config.defaultCluster,
            buildnumber,
            clusterHostname,
          }
        });
        break;
      } else {
        await wait(2000);
      }
    }
  }

  return true;
}