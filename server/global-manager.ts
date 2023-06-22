import Root from "../base/Root";
import Module from "../base/Root/Module";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { IServerDataType } from ".";
import { logger } from "./logger";
import {
  SERVER_DATA_IDENTIFIER,
  SERVER_DATA_MIN_UPDATE_TIME,
  CURRENCY_FACTORS_IDENTIFIER,
  CONNECTOR_SQL_COLUMN_ID_FK_NAME,
  CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  UNSPECIFIED_OWNER,
  SERVER_MAPPING_TIME,
  SERVER_BLOCK_UNTIL_REFRESH_TIME,
  SERVER_ELASTIC_CONSISTENCY_CHECK_TIME,
} from "../constants";
import {
  ISensitiveConfigRawJSONDataType,
  IConfigRawJSONDataType,
} from "../config";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import uuid from "uuid";
import Include, { IncludeExclusionState } from "../base/Root/Module/ItemDefinition/Include";
import { SEOGenerator } from "./seo/generator";
import { IRedisEvent } from "../base/remote-protocol";
import { ServiceProvider } from "./services";
import CurrencyFactorsProvider from "./services/base/CurrencyFactorsProvider";
import { RegistryService } from "./services/registry";
import { ItemizeRedisClient } from "./redis";
import { ISQLTableRowValue } from "../base/Root/sql";
import MailProvider from "./services/base/MailProvider";
import { DatabaseConnection } from "../database";
import { IManyValueType } from "../database/base";
import PhoneProvider from "./services/base/PhoneProvider";
import { ItemizeRawDB } from "./raw-db";
import { ItemizeElasticClient } from "./elastic";
import { GLOBAL_MANAGER_MODE, GLOBAL_MANAGER_SERVICES, REFRESH_ADMIN_PASSWORD } from "./environment";

interface IMantainProp {
  pdef: PropertyDefinition;
  itemDefinition: ItemDefinition;
  include: Include;
}

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * This function is to be executed during intialization of the global manager
 * in server data mode, in order for you, the developer to setup server
 * data and other resources
 */
export type InitialExecutionServerDataFn = (manager: GlobalManager) => Promise<void> | void;

export class GlobalManager {
  public root: Root;
  public buildnumber: string;
  private databaseConnection: DatabaseConnection;
  public rawDB: ItemizeRawDB;
  public elastic: ItemizeElasticClient;
  public globalCache: ItemizeRedisClient;
  public redisPub: ItemizeRedisClient;
  public redisSub: ItemizeRedisClient;
  private idefNeedsMantenience: ItemDefinition[];
  private modNeedsMantenience: Module[];
  public serverData: IServerDataType;
  private serverDataLastUpdated: number;
  private seoGenLastUpdated: number;
  private elasticCleanupLastExecuted: number;
  private blocksReleaseLastExecuted: number;
  private currencyFactorsProvider: CurrencyFactorsProvider<any>;
  public sensitiveConfig: ISensitiveConfigRawJSONDataType;
  public mailProvider: MailProvider<any>;
  public config: IConfigRawJSONDataType;
  private seoGenerator: SEOGenerator;
  private customServices: {
    [name: string]: ServiceProvider<any>;
  };
  public registry: RegistryService;
  public phoneProvider: PhoneProvider<any>;
  private initialExecutionServerDataFn: InitialExecutionServerDataFn;

  constructor(
    buildnumber: string,
    root: Root,
    databaseConnection: DatabaseConnection,
    rawDB: ItemizeRawDB,
    elastic: ItemizeElasticClient,
    globalCache: ItemizeRedisClient,
    redisPub: ItemizeRedisClient,
    redisSub: ItemizeRedisClient,
    config: IConfigRawJSONDataType,
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
    currencyFactorsProvider: CurrencyFactorsProvider<any>,
    mailProvider: MailProvider<any>,
    phoneProvider: PhoneProvider<any>,
    registry: RegistryService,
    initialExecutionServerDataFn: InitialExecutionServerDataFn,
  ) {
    this.buildnumber = buildnumber;
    this.root = root;
    this.databaseConnection = databaseConnection;
    this.rawDB = rawDB;
    this.globalCache = globalCache;
    this.redisPub = redisPub;
    this.redisSub = redisSub;
    this.idefNeedsMantenience = [];
    this.modNeedsMantenience = [];
    this.serverData = null;
    this.config = config;
    this.sensitiveConfig = sensitiveConfig;
    this.registry = registry;
    this.mailProvider = mailProvider;
    this.phoneProvider = phoneProvider;
    this.elastic = elastic;
    this.initialExecutionServerDataFn = initialExecutionServerDataFn;

    this.currencyFactorsProvider = currencyFactorsProvider;

    this.customServices = {};

    mailProvider && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA" || GLOBAL_MANAGER_MODE === "SERVICES") &&
      mailProvider.setupGlobalResources(
        this.databaseConnection,
        this.globalCache,
        this.redisPub,
        this.redisSub,
        this.mailProvider,
        this.phoneProvider,
        this.customServices,
        this.root
      );
    phoneProvider && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA" || GLOBAL_MANAGER_MODE === "SERVICES") &&
      phoneProvider.setupGlobalResources(
        this.databaseConnection,
        this.globalCache,
        this.redisPub,
        this.redisSub,
        this.mailProvider,
        this.phoneProvider,
        this.customServices,
        this.root
      );
    currencyFactorsProvider && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA") &&
      currencyFactorsProvider.setupGlobalResources(
        this.databaseConnection,
        this.globalCache,
        this.redisPub,
        this.redisSub,
        this.mailProvider,
        this.phoneProvider,
        this.customServices,
        this.root
      );

    this.processIdef = this.processIdef.bind(this);
    this.processModule = this.processModule.bind(this);
    this.run = this.run.bind(this);
    this.addAdminUserIfMissing = this.addAdminUserIfMissing.bind(this);

    const modules = this.root.getAllModules();
    modules.forEach(this.processModule);

    // we want to make sure the admin user is added in case
    // before preparing the instance so that it is
    // indexed if our schema defines it as such
    if (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA") {
      this.addAdminUserIfMissing();
    }

    if (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "ELASTIC") {
      this.elastic && this.elastic.prepareInstance();
    }
  }
  public setSEOGenerator(seoGenerator: SEOGenerator) {
    this.seoGenerator = seoGenerator;
  }
  public installGlobalService(service: ServiceProvider<any>) {
    if (
      GLOBAL_MANAGER_MODE === "ABSOLUTE" ||
      (
        GLOBAL_MANAGER_MODE === "SERVICES" &&
        (GLOBAL_MANAGER_SERVICES.includes(service.getInstanceName()) || GLOBAL_MANAGER_SERVICES.length === 0)
      )
    ) {
      this.customServices[service.getInstanceName()] = service;
      service.setupGlobalResources(
        this.databaseConnection,
        this.globalCache,
        this.redisPub,
        this.redisSub,
        this.mailProvider,
        this.phoneProvider,
        this.customServices,
        this.root
      );
    }
  }
  public async initializeServices() {
    if (this.mailProvider && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA" || GLOBAL_MANAGER_MODE === "SERVICES")) {
      await this.mailProvider.initialize();
    }
    if (this.phoneProvider && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA" || GLOBAL_MANAGER_MODE === "SERVICES")) {
      await this.phoneProvider.initialize();
    }
    if (this.currencyFactorsProvider && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA")) {
      await this.currencyFactorsProvider.initialize();
    }

    if (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVICES") {
      await Promise.all(
        Object.keys(this.customServices).map((sKey) => {
          return this.customServices[sKey].initialize();
        })
      );
    }
  }
  private async addAdminUserIfMissing() {
    if (!this.config.roles.includes("ADMIN")) {
      logger.info(
        {
          className: "GlobalManager",
          methodName: "addAdminUserIfMissing",
          message: "Admin role is not included within the roles; avoiding this check",
        }
      );
      return;
    }

    const userMod = this.root.getModuleFor(["users"]);
    const userIdef = userMod.getItemDefinitionFor(["user"]);
    const moduleTable = userMod.getQualifiedPathName();
    const selfTable = userIdef.getQualifiedPathName();
    let primaryAdminUser: any;
    try {
      primaryAdminUser = await this.databaseConnection.queryFirst(
        `SELECT ${JSON.stringify(
          CONNECTOR_SQL_COLUMN_ID_FK_NAME
        )}, "username" FROM ${JSON.stringify(selfTable)} WHERE "role"='ADMIN' LIMIT 1`
      );
    } catch (err) {
      logger.error(
        {
          className: "GlobalManager",
          methodName: "addAdminUserIfMissing",
          message: "Database does not appear to be connected",
          serious: true,
          err,
        }
      );
    }

    if (!primaryAdminUser) {
      logger.info(
        {
          className: "GlobalManager",
          methodName: "addAdminUserIfMissing",
          message: "Admin user is considered missing; adding one",
        }
      );

      let currentAdminUserWithSuchUsername: any;
      try {
        currentAdminUserWithSuchUsername = await this.databaseConnection.queryFirst(
          `SELECT ${JSON.stringify(
            CONNECTOR_SQL_COLUMN_ID_FK_NAME
          )} FROM ${JSON.stringify(selfTable)} WHERE "username"='admin' LIMIT 1`
        );
      } catch (err) {
        logger.error(
          {
            className: "GlobalManager",
            methodName: "addAdminUserIfMissing",
            message: "Database does not appear to be connected",
            serious: true,
            err,
          }
        );
      }

      let username = "admin";
      if (currentAdminUserWithSuchUsername) {
        username = "admin" + new Date().getTime();
      }

      const password = uuid.v4().replace(/\-/g, "");

      const sqlModData: IManyValueType = {
        type: userIdef.getQualifiedPathName(),
        last_modified: ["NOW()", []],
        created_at: ["NOW()", []],
        created_by: UNSPECIFIED_OWNER,
        version: "",
        container_id: this.sensitiveConfig.defaultContainerID,
      };

      const sqlIdefData: IManyValueType = {
        username,
        password: ["crypt(?, gen_salt('bf',10))", [password]],
        role: "ADMIN",
        app_language: this.config.fallbackLanguage,
        app_country: this.config.fallbackCountryCode,
        app_currency: this.config.fallbackCurrency,
      };

      const moreIdefProperties = userIdef.getAllPropertyDefinitionsAndExtensions();
      moreIdefProperties.forEach((p) => {
        const id = p.getId();
        const isExtension = p.isExtension();

        if (
          (isExtension && !sqlModData[id]) ||
          (!isExtension && !sqlIdefData[id])
        ) {
          const value = p.getCurrentValue(null, null);
          const sqlInValue: ISQLTableRowValue = p
            .getPropertyDefinitionDescription()
            .sqlIn({
              dictionary: "english",
              language: "en",
              id,
              itemDefinition: userIdef,
              prefix: "",
              property: p,
              serverData: this.serverData,
              appData: null,
              value,
            });

          if (isExtension) {
            Object.assign(sqlModData, sqlInValue);
          } else {
            Object.assign(sqlIdefData, sqlInValue);
          }
        }
      });

      // add includes that need to be set in their default values
      const includes = userIdef.getAllIncludes();
      includes.forEach((i) => {
        // grab sinking properties
        const sinkingProperties = i.getSinkingPropertiesIds();
        // get the state
        const value = i.getStateNoExternalChecking(null, null, sinkingProperties);
        // set it in the idef data
        sqlIdefData[i.getPrefixedQualifiedIdentifier()] = value.exclusionState;

        // if it's not excluded we are ready to add more info
        if (value.exclusionState !== IncludeExclusionState.EXCLUDED) {
          // using the sinking properties we get the value
          sinkingProperties.forEach((id) => {
            const valueInState = value.itemState.properties.find((p) => p.propertyId === id);
            const propDef = i.getSinkingPropertyFor(id);

            const sqlInValue: ISQLTableRowValue = propDef
              .getPropertyDefinitionDescription()
              .sqlIn({
                dictionary: "english",
                language: "en",
                id,
                itemDefinition: userIdef,
                prefix: i.getPrefixedQualifiedIdentifier(),
                property: propDef,
                serverData: this.serverData,
                appData: null,
                value: valueInState.value,
              });

            Object.assign(sqlIdefData, sqlInValue);
          })
        }
      });

      try {
        await this.databaseConnection.startTransaction(
          async (transactingDatabase) => {
            const insertQueryMod = transactingDatabase
              .getInsertBuilder()
              .table(moduleTable);
            insertQueryMod.insert(sqlModData).returningBuilder.returningAll();
            const insertQueryValueMod = await transactingDatabase.queryFirst(
              insertQueryMod
            );

            sqlIdefData[CONNECTOR_SQL_COLUMN_ID_FK_NAME] =
              insertQueryValueMod.id;
            sqlIdefData[CONNECTOR_SQL_COLUMN_VERSION_FK_NAME] =
              insertQueryValueMod.version;

            const insertQueryIdef = transactingDatabase
              .getInsertBuilder()
              .table(selfTable);
            insertQueryIdef.insert(sqlIdefData).returningBuilder.returningAll();
            const insertQueryValueIdef = await transactingDatabase.queryFirst(
              insertQueryIdef
            );

            return {
              ...insertQueryValueMod,
              ...insertQueryValueIdef,
            };
          }
        );
      } catch (err) {
        logger.error(
          {
            className: "GlobalManager",
            methodName: "addAdminUserIfMissing",
            message: "Failed to add admin user when it was considered missing",
            err,
          }
        );
      }

      logger.info(
        {
          className: "GlobalManager",
          methodName: "addAdminUserIfMissing",
          message: "Sucessfully added admin user",
          data: {
            username,
            password,
          },
        }
      );
    } else if (REFRESH_ADMIN_PASSWORD) {
      logger.info(
        {
          className: "GlobalManager",
          methodName: "addAdminUserIfMissing",
          message: "Admin user is found but REFRESH_ADMIN_PASSWORD is true, updating",
        }
      );

      const username = primaryAdminUser.username;
      const userId = primaryAdminUser[CONNECTOR_SQL_COLUMN_ID_FK_NAME];
      const newPassword = uuid.v4().replace(/\-/g, "");

      try {
        await this.databaseConnection.queryFirst(
          `UPDATE ${JSON.stringify(selfTable)} SET "password"=crypt($1, gen_salt('bf',10)) WHERE ${JSON.stringify(
            CONNECTOR_SQL_COLUMN_ID_FK_NAME
          )} = $2`,
          [
            newPassword,
            userId,
          ]
        );
        logger.info(
          {
            className: "GlobalManager",
            methodName: "addAdminUserIfMissing",
            message: "Sucessfully modified admin user",
            data: {
              username,
              newPassword,
            },
          }
        );
      } catch (err) {
        logger.error(
          {
            className: "GlobalManager",
            methodName: "addAdminUserIfMissing",
            message: "Database does not appear to be connected",
            serious: true,
            err,
          }
        );
      }

    }
  }
  private processModule(mod: Module) {
    mod.getAllModules().forEach(this.processModule);
    const hasSqlManteniedProperties = mod
      .getAllPropExtensions()
      .some(
        (p) =>
          p.getPropertyDefinitionDescription().sqlMantenience &&
          p.isSearchable()
      );
    if (hasSqlManteniedProperties) {
      logger.info(
        {
          className: "GlobalManager",
          methodName: "processModule",
          message: "Found module that needs mantenience " +
            mod.getQualifiedPathName(),
        }
      );
      this.modNeedsMantenience.push(mod);

      const searchLimiters = mod.getSearchLimiters();
      const sinceLimiter =
        searchLimiters &&
        searchLimiters.condition === "AND" &&
        searchLimiters.since;
      if (!searchLimiters || !sinceLimiter) {
        logger.info(
          {
            className: "GlobalManager",
            methodName: "processModule",
            message: "Module has definitions that need mantenience but they hold no AND since request limiter " +
              mod.getQualifiedPathName(),
          }
        );
      }
    }
    const childItemDefinitions = mod.getAllChildItemDefinitions();
    childItemDefinitions.forEach(this.processIdef);
  }
  private processIdef(idef: ItemDefinition) {
    idef.getChildDefinitions().forEach(this.processIdef);

    const hasSqlManteniedProperties = idef
      .getAllPropertyDefinitions()
      .some(
        (p) =>
          p.getPropertyDefinitionDescription().sqlMantenience &&
          p.isSearchable()
      );

    const hasIncludeSQLManteniedProperties = idef.getAllIncludes().some((i) => {
      return i
        .getSinkingProperties()
        .some(
          (sp) =>
            sp.getPropertyDefinitionDescription().sqlMantenience &&
            sp.isSearchable()
        );
    });

    if (hasSqlManteniedProperties || hasIncludeSQLManteniedProperties) {
      logger.info(
        {
          className: "GlobalManager",
          methodName: "processIdef",
          message: "Found item definition that needs mantenience " +
            idef.getQualifiedPathName(),
        }
      );
      this.idefNeedsMantenience.push(idef);

      const searchLimiters =
        idef.getSearchLimiters() ||
        idef.getParentModule().getSearchLimiters();
      const sinceLimiter =
        searchLimiters &&
        searchLimiters.condition === "AND" &&
        searchLimiters.since;
      if (!searchLimiters || !sinceLimiter) {
        logger.info(
          {
            className: "GlobalManager",
            methodName: "processIdef",
            message: "Item definition need mantenience but item definition nor module holds no AND since request limiter " +
              idef.getQualifiedPathName(),
          }
        );
      }
    }
  }
  public async releaseBlocksFor(m: Module | Root) {
    if (m instanceof Module) {
      this.rawDB.performModuleBatchRawDBUpdate(m, {
        whereCriteriaSelector: (arg) => {
          arg.andWhereColumnNotNull("blocked_at")
          arg.andWhereColumnNotNull("blocked_until")
          arg.andWhereColumn("blocked_until", "<=", ["NOW()", []])
        },
        moduleTableUpdate: {
          blocked_at: null,
          blocked_by: null,
          blocked_until: null,
        },
      });
    }

    const childModules = m.getAllModules();

    for (let subm of childModules) {
      await this.releaseBlocksFor(subm);
    }
  }
  public async executeInitialServerDataFunction() {
    try {
      this.initialExecutionServerDataFn && await this.initialExecutionServerDataFn(this);
    } catch (err) {
      logger.error(
        {
          className: "GlobalManager",
          methodName: "executeServerDataFunction",
          message: "Failed to execute server provided initial execution in server data mode functionality",
          err,
        }
      );
    }
  }
  public async releaseBlocks() {
    while (true) {
      this.blocksReleaseLastExecuted = new Date().getTime();

      logger.info({
        className: "GlobalManager",
        methodName: "releaseBlocks",
        message: "Running release temporary blocks",
      });
      try {
        await this.releaseBlocksFor(this.root);
      } catch (err) {
        logger.error(
          {
            className: "GlobalManager",
            methodName: "releaseBlocks",
            message: "Temporary blocks failed to be released",
            err,
          }
        );
      }

      const nowTime = new Date().getTime();
      const timeItPassedSinceBlockReleaseRan = nowTime - this.blocksReleaseLastExecuted;
      const timeUntilBlockReleaseNeedsToRun =
        SERVER_BLOCK_UNTIL_REFRESH_TIME - timeItPassedSinceBlockReleaseRan;

      if (timeUntilBlockReleaseNeedsToRun <= 0) {
        logger.error(
          {
            className: "GlobalManager",
            methodName: "releaseBlocks",
            message: "During the processing of events the time needed until releasing blocks was negative" +
              " this means the server took forever doing the last mapping; clearly something is off",
            serious: true,
            data: {
              timeUntilBlockReleaseNeedsToRun,
            },
          }
        );
      } else {
        logger.info(
          {
            className: "GlobalManager",
            methodName: "releaseBlocks",
            message: "Blocking releaser tasked to run in " +
              timeUntilBlockReleaseNeedsToRun +
              "ms",
          }
        );
        await wait(timeUntilBlockReleaseNeedsToRun);
      }
    }
  }
  public run() {
    logger.info({
      className: "GlobalManager",
      methodName: "run",
      message: "Running global manager",
    });

    if (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA") {
      this.releaseBlocks();
      this.executeInitialServerDataFunction();
    }

    // currency factors shoudn't really have its own execution but who knows
    if (
      this.currencyFactorsProvider &&
      (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA")
    ) {
      this.currencyFactorsProvider.execute();
    }

    if (
      this.mailProvider &&
      GLOBAL_MANAGER_MODE === "ABSOLUTE"
    ) {
      this.mailProvider.execute();
    }

    // hijack the seo generator and do our own executions
    if (this.seoGenerator && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SITEMAPS")) {
      (async () => {
        while (true) {
          this.seoGenLastUpdated = new Date().getTime();

          logger.info({
            className: "GlobalManager",
            methodName: "run",
            message: "Running SEO Generator",
          });
          try {
            await this.seoGenerator.run();
          } catch (err) {
            logger.error(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "Seo generator failed to run",
                serious: true,
                err,
              }
            );
          }

          const nowTime = new Date().getTime();
          const timeItPassedSinceSeoGenRan = nowTime - this.seoGenLastUpdated;
          const timeUntilSeoGenNeedsToRun =
            SERVER_MAPPING_TIME - timeItPassedSinceSeoGenRan;

          if (timeUntilSeoGenNeedsToRun <= 0) {
            logger.error(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "During the processing of events the time needed until next mapping was negative" +
                  " this means the server took forever doing the last mapping; clearly something is off",
                serious: true,
                data: {
                  timeUntilSeoGenNeedsToRun,
                },
              }
            );
          } else {
            logger.info(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "SEO generator tasked to run in " +
                  timeUntilSeoGenNeedsToRun +
                  "ms",
              }
            );
            await wait(timeUntilSeoGenNeedsToRun);
          }
        }
      })();
    }

    if (this.elastic && (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "ELASTIC")) {
      (async () => {
        let firstAvoided = false;
        while (true) {
          this.elasticCleanupLastExecuted = new Date().getTime();

          try {
            // we will avoid the first because instance preparation does a consistency check
            if (firstAvoided) {
              logger.info({
                className: "GlobalManager",
                methodName: "run",
                message: "Running elasticsearch consistency check",
              });
              if (!this.elastic.isRunningConsistencyCheck()) {
                await this.elastic.runConsistencyCheck();
              } else {
                logger.info({
                  className: "GlobalManager",
                  methodName: "run",
                  message: "The initial preparation consistency check is still running",
                });
              }
            }
            firstAvoided = true;
          } catch (err) {
            logger.error(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "Elasticsearch consistency check failed to run",
                serious: true,
                err,
              }
            );
          }

          const nowTime = new Date().getTime();
          const timeItPassedSinceElasticCleanupRan = nowTime - this.elasticCleanupLastExecuted;
          const timeUntilElasticCleanupNeedsToRun =
            SERVER_ELASTIC_CONSISTENCY_CHECK_TIME - timeItPassedSinceElasticCleanupRan;

          if (timeUntilElasticCleanupNeedsToRun <= 0) {
            logger.error(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "During the processing of events the time needed until next elastic consistency check was negative" +
                  " this means the server took forever doing the last consistency check; clearly something is off",
                serious: true,
                data: {
                  timeUntilElasticCleanupNeedsToRun,
                },
              }
            );
          } else {
            logger.info(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "Elasticsearch consistency check tasked to run in " +
                  timeUntilElasticCleanupNeedsToRun +
                  "ms",
              }
            );
            await wait(timeUntilElasticCleanupNeedsToRun);
          }
        }
      })();
    }

    // this is what it's used with currency factors in reality
    if (
      GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVER_DATA"
    ) {
      (async () => {
        while (true) {
          this.serverDataLastUpdated = new Date().getTime();

          let retries: number = 0;
          let gaveUp: boolean = false;
          // setup this retries protocol because as it seems
          // losing connection in the server due to shoddy connectivity is possible
          while (true) {
            try {
              await this.calculateServerData();
              break;
            } catch (err) {
              if (retries <= 5) {
                logger.error(
                  {
                    className: "GlobalManager",
                    methodName: "run",
                    message: "Server data calculation failed; attempting retry in 10s",
                    serious: true,
                    err,
                  }
                );
                await wait(10000);
                retries++;
              } else {
                logger.error(
                  {
                    className: "GlobalManager",
                    methodName: "run",
                    message: "Server data calculation failed; giving up",
                    serious: true,
                    err,
                  }
                );
                gaveUp = true;
                break;
              }
            }
          }

          if (!gaveUp) {
            retries = 0;

            while (true) {
              try {
                await this.informNewServerData();
                break;
              } catch (err) {
                if (retries <= 5) {
                  logger.error(
                    {
                      className: "GlobalManager",
                      methodName: "run",
                      message: "Informing new server data failed; attempting retry in 10s",
                      serious: true,
                      err,
                    }
                  );
                  await wait(10000);
                  retries++;
                } else {
                  logger.error(
                    {
                      className: "GlobalManager",
                      methodName: "run",
                      message: "Informing new server data failed; giving up",
                      serious: true,
                      err,
                    }
                  );
                  gaveUp = true;
                  break;
                }
              }
            }

            if (!gaveUp) {
              retries = 0;

              while (true) {
                try {
                  await this.runOnce();
                  break;
                } catch (err) {
                  if (retries <= 5) {
                    logger.error(
                      {
                        className: "GlobalManager",
                        methodName: "run",
                        message: "Run once function failed to run; attempting retry in 10s",
                        serious: true,
                        err,
                      }
                    );
                    await wait(10000);
                    retries++;
                  } else {
                    logger.error(
                      {
                        className: "GlobalManager",
                        methodName: "run",
                        message: "Run once function failed; giving up",
                        serious: true,
                        err,
                      }
                    );
                    gaveUp = true;
                    break;
                  }
                }
              }
            }
          }

          const nowTime = new Date().getTime();
          const timeItPassedSinceServerDataLastUpdated =
            nowTime - this.serverDataLastUpdated;
          const timeUntilItNeedsToUpdate =
            SERVER_DATA_MIN_UPDATE_TIME - timeItPassedSinceServerDataLastUpdated;

          if (timeUntilItNeedsToUpdate <= 0) {
            logger.error(
              {
                message: "GlobalManager.run [SERIOUS]: during the processing of events the time needed until next update was negative" +
                  " this means the server took too long doing mantenience tasks, this means your database is very large, while this is not " +
                  " a real error as it was handled gracefully, this should be addressed to itemize developers",
                data: {
                  timeUntilItNeedsToUpdate,
                }
              },
            );
          } else {
            logger.info(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "Server data and updater tasked to run in " +
                  timeUntilItNeedsToUpdate +
                  "ms",
              }
            );
            await wait(timeUntilItNeedsToUpdate);
          }
        }
      })();
    }

    // when the global manager mode is not absolute but only the elastic type then we are
    // required to hook into the event to inform new server data because in the absolute mode
    // we cheat and inform new server data directly
    if (GLOBAL_MANAGER_MODE === "ELASTIC") {
      // we need to setup this function to setup the listener
      (async () => {
        // first let's see if we got anything stored in memory
        const storedStrValue = await this.globalCache.get(SERVER_DATA_IDENTIFIER) || null;
        // if we do then we can use that as it is
        if (storedStrValue) {
          // and use it inside if we can
          try {
            const storedValue = JSON.parse(storedStrValue);
            this.elastic.informNewServerData(storedValue);
          } catch (err) {
            logger.error(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "Unable to parse server data stored in redis",
                serious: true,
                err,
                data: {
                  storedStrValue,
                },
              }
            );
          }
        }

        // and now we can setup the events and subscriptions for the server data
        this.redisSub.redisClient.subscribe(SERVER_DATA_IDENTIFIER);
        // once we get it
        this.redisSub.redisClient.on("message", (channel, message) => {
          // then we need to grab that event
          try {
            const redisEvent: IRedisEvent = JSON.parse(message);
            if (redisEvent.type === SERVER_DATA_IDENTIFIER) {
              const data = redisEvent.data;
              if (!data) {
                logger.error(
                  {
                    className: "GlobalManager",
                    methodName: "run",
                    message: "Did not get any data in the redis event at " + channel,
                    serious: true,
                    data: {
                      message,
                      redisEvent,
                    },
                  }
                );
              } else {
                // and send that data to elasticsearch
                this.elastic.informNewServerData(data);
              }
            }
          } catch (err) {
            logger.error(
              {
                className: "GlobalManager",
                methodName: "run",
                message: "Unable to process redis event at " + channel,
                serious: true,
                err,
                data: {
                  message,
                },
              }
            );
          }
        });
      })();
    }

    // execute every custom service
    if (GLOBAL_MANAGER_MODE === "ABSOLUTE" || GLOBAL_MANAGER_MODE === "SERVICES") {
      Object.keys(this.customServices).forEach((s) =>
        this.customServices[s].execute()
      );
    }
  }
  private async runOnce() {
    for (const mod of this.modNeedsMantenience) {
      await this.runForModule(mod);
    }
    for (const idef of this.idefNeedsMantenience) {
      await this.runForIdef(idef);
    }
  }
  private async runForModule(mod: Module) {
    const propertiesThatNeedMantenience: IMantainProp[] = mod
      .getAllPropExtensions()
      .filter(
        (p) =>
          p.getPropertyDefinitionDescription().sqlMantenience &&
          p.isSearchable()
      )
      .map((p) => ({
        pdef: p,
        itemDefinition: null,
        include: null,
      }));
    const limiters = mod.getSearchLimiters();
    const since =
      limiters && limiters.condition === "AND" ? limiters.since : null;
    await this.runFor(
      mod.getQualifiedPathName(),
      true,
      propertiesThatNeedMantenience,
      since
    );
  }
  private async runForIdef(idef: ItemDefinition) {
    const propertiesThatNeedMantenience: IMantainProp[] = idef
      .getAllPropertyDefinitions()
      .filter(
        (p) =>
          p.getPropertyDefinitionDescription().sqlMantenience &&
          p.isSearchable()
      )
      .map((p) => ({
        pdef: p,
        itemDefinition: idef,
        include: null,
      }));

    const includePropertiesThatNeedMantenience: IMantainProp[][] = idef
      .getAllIncludes()
      .map((i) => {
        return i
          .getSinkingProperties()
          .filter(
            (sp) =>
              sp.getPropertyDefinitionDescription().sqlMantenience &&
              sp.isSearchable()
          )
          .map((sp) => ({
            pdef: sp,
            include: i,
            itemDefinition: idef,
          }));
      });

    let totalPropertiesThatNeedMantenience: IMantainProp[] = propertiesThatNeedMantenience;
    includePropertiesThatNeedMantenience.forEach((includePropArray) => {
      totalPropertiesThatNeedMantenience = totalPropertiesThatNeedMantenience.concat(
        includePropArray
      );
    });
    const limiters =
      idef.getSearchLimiters() || idef.getParentModule().getSearchLimiters();
    const since =
      limiters && limiters.condition === "AND" ? limiters.since : null;
    await this.runFor(
      idef.getQualifiedPathName(),
      false,
      totalPropertiesThatNeedMantenience,
      since
    );
  }
  private async runFor(
    tableName: string,
    isModule: boolean,
    properties: IMantainProp[],
    since: number
  ) {
    const sinceLimiter = since ? new Date(new Date().getTime() - since) : null;

    // let's build the update rules for the mantenience
    const updateRules: any = {};

    // these are the from tables we should select
    const fromRules: Array<{
      from: string;
      as: string;
    }> = [];

    // and and or rules
    const andWhereRules: Array<[string, any[]]> = [];
    const orWhereRules: Array<[string, any[]]> = [];

    // so we lookup all the properties for mantenience rules
    properties.forEach((p) => {
      // and get one if given
      const mantenienceRule = p.pdef
        .getPropertyDefinitionDescription()
        .sqlMantenience({
          serverData: this.serverData,
          appData: null,
          id: p.pdef.getId(),
          prefix: p.include ? p.include.getPrefixedQualifiedIdentifier() : "",
          property: p.pdef,
          itemDefinition: p.itemDefinition,
        });

      // if we get one
      if (mantenienceRule) {
        // we save the data
        updateRules[mantenienceRule.columnToSet] =
          mantenienceRule.setColumnToRaw;
        if (mantenienceRule.from) {
          fromRules.push({
            from: mantenienceRule.from,
            as: mantenienceRule.fromAs,
          });
        }
        if (mantenienceRule.whereRaw) {
          andWhereRules.push(mantenienceRule.whereRaw);
        }
        if (mantenienceRule.updateConditionRaw) {
          orWhereRules.push(mantenienceRule.updateConditionRaw);
        }
      }
    });

    // now we can build the query
    let query = `UPDATE ${JSON.stringify(tableName)} SET`;
    // and the bindings for that query at the same time
    let bindings: any[] = [];

    query +=
      " " +
      Object.keys(updateRules)
        .map((columnToSet) => {
          // this specifies what column we are setting and how we are setting it as
          const ruleRawStr = updateRules[columnToSet][0];
          bindings = bindings.concat(updateRules[columnToSet][1]);

          // and we set it to the value
          return JSON.stringify(columnToSet) + " = " + ruleRawStr;
        })
        .join(", ");

    if (fromRules.length) {
      query += " FROM ";
      query += fromRules
        .map((rule) => {
          return JSON.stringify(rule.from) + " " + JSON.stringify(rule.as);
        })
        .join(",");
    }

    if (sinceLimiter || orWhereRules.length || andWhereRules.length) {
      query += " WHERE";
    }

    if (sinceLimiter) {
      query += ` "created_at" >= ?`;
      bindings.push(sinceLimiter);
    }

    if (andWhereRules.length) {
      if (sinceLimiter) {
        query += " AND ";
      } else {
        query += " ";
      }
      query += andWhereRules
        .map((rule) => {
          bindings = bindings.concat(rule[1]);
          return rule[0];
        })
        .join(" AND ");
    }

    if (orWhereRules.length) {
      if (sinceLimiter || andWhereRules.length) {
        query += " AND (";
      } else {
        query += " (";
      }

      query += orWhereRules
        .map((rule) => {
          bindings = bindings.concat(rule[1]);
          return rule[0];
        })
        .join(" OR ");

      query += ")";
    }

    const splitted = query.split("?");
    let pgifiedQuery = "";
    splitted.forEach((v, index) => {
      if (index !== 0) {
        pgifiedQuery += "$" + index;
      }
      pgifiedQuery += v;
    });

    await this.databaseConnection.query(pgifiedQuery, bindings);

    // we do not update last_modified in order to avoid useless updates
    // sql mantenience changes now so that it doesn't inform any client or cluster for changes
    // it could, but now it's considered a search only property, changes are hence, silent

    // UPDATE TABLE "stuffs" SET "normalized_0"=c0."factor"*"value_0", "normalized_1"=c1."factor"*"value_1" FROM "currencyfactors" c0, "currencyfactors" c1 WHERE c0."name"="currency_0" AND c1."name"="currency_1" AND (c0."factor"*s."value_0" > 0.5 OR c1."factor"*"value_1" > 0.5) RETURNING *
    // buggy typescript again
  }
  private async calculateServerData() {
    logger.info({
      className: "GlobalManager",
      methodName: "calculateServerData",
      message: "Updating server data",
    });

    try {
      this.serverData = {
        BUILDNUMBER: this.buildnumber,
        [CURRENCY_FACTORS_IDENTIFIER]: this.currencyFactorsProvider
          ? await this.currencyFactorsProvider.getFactors()
          : null,
      };
    } catch (err) {
      logger.error(
        {
          className: "GlobalManager",
          methodName: "calculateServerData",
          message: "Failed to calculate server data",
          serious: true,
          err,
        }
      );
      throw err;
    }
  }
  private async informNewServerData() {
    logger.info(
      {
        className: "GlobalManager",
        methodName: "informNewServerData",
        message: "Updating database with new server data",
      }
    );

    // STORE currency factors in the database if available
    // for storing
    if (this.serverData[CURRENCY_FACTORS_IDENTIFIER]) {
      let valuesContainer = "";
      let valuesAsArray: Array<string | number> = [];
      Object.keys(this.serverData[CURRENCY_FACTORS_IDENTIFIER]).forEach(
        (currencyId, index) => {
          if (valuesContainer) {
            valuesContainer += ",";
          }
          const nValue = index * 2;
          valuesContainer += `($${nValue + 1},$${nValue + 2})`;
          valuesAsArray = valuesAsArray.concat([
            currencyId,
            this.serverData[CURRENCY_FACTORS_IDENTIFIER][currencyId],
          ]);
        }
      );
      try {
        await this.databaseConnection.queryFirst(
          `INSERT INTO ${JSON.stringify(
            CURRENCY_FACTORS_IDENTIFIER
          )} ("code", "factor") VALUES ${valuesContainer} ` +
          `ON CONFLICT ("code") DO UPDATE SET "factor" = EXCLUDED."factor"`,
          valuesAsArray
        );
      } catch (err) {
        logger.error(
          {
            className: "GlobalManager",
            methodName: "informNewServerData",
            message: "[SERIOUS] was unable to update database new currency data",
            err,
          }
        );
        throw err;
      }

      // because we are in absolute mode we can both get the server data
      // and inform it to elastic right away, otherwise elastic is meant to hook into the event
      if (GLOBAL_MANAGER_MODE === "ABSOLUTE") {
        this.elastic && this.elastic.informNewServerData(this.serverData);
      }
    }

    logger.info(
      {
        className: "GlobalManager",
        methodName: "informNewServerData",
        message: "Updating global cache with new server data",
      }
    );

    // stringify the server data
    const stringifiedServerData = JSON.stringify(this.serverData);

    // update the server data so that the instances can receive it
    this.globalCache.redisClient.set(
      SERVER_DATA_IDENTIFIER,
      stringifiedServerData,
      (err: Error) => {
        if (err) {
          logger.error(
            {
              className: "GlobalManager",
              methodName: "informNewServerData",
              message: "Was unable to inform for new server data in set",
              serious: true,
              err,
            }
          );
        }
      }
    );

    logger.info(
      {
        className: "GlobalManager",
        methodName: "informNewServerData",
        message: "Informing clusters of new server data",
      }
    );

    const redisEvent: IRedisEvent = {
      source: "global",
      type: SERVER_DATA_IDENTIFIER,
      serverInstanceGroupId: null,
      data: this.serverData,
      mergedIndexIdentifier: null,
    };

    // publishing new server data
    this.redisPub.redisClient.publish(
      SERVER_DATA_IDENTIFIER,
      JSON.stringify(redisEvent),
      (err: Error) => {
        if (err) {
          logger.error(
            {
              className: "GlobalManager",
              methodName: "informNewServerData",
              serious: true,
              message: "was unable to inform for new server data in publish",
              err,
            }
          );
        }
      }
    );
  }
}
