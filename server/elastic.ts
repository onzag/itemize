import type { Client } from "@elastic/elasticsearch";
import type ItemDefinition from "../base/Root/Module/ItemDefinition";
import type Module from "../base/Root/Module";
import type { ItemizeRawDB } from "./raw-db";
import type Root from "../base/Root";
import { getElasticSchemaForRoot, IElasticSchemaDefinitionType, ISQLTableRowValue } from "../base/Root/sql";

interface ILangAnalyzers {
  [key: string]: string;
}

interface IElasticDefinitionInformationType {
  qualifiedName: string;
  lastModified: string;
  status: "READY" | "IN_PROGRESS";
  definition: any;
}

export class ItemizeElasticClient {
  public elasticClient: Client;
  private rawDB: ItemizeRawDB;
  private root: Root;
  private rootSchema: IElasticSchemaDefinitionType;
  private langAnalyzers: ILangAnalyzers;
  private serverData: any;

  private serverDataPromise: Promise<void>;
  private serverDataPromiseResolve: () => void;

  constructor(
    root: Root,
    rawDB: ItemizeRawDB,
    elasticClient: Client,
    langAnalyzers: ILangAnalyzers,
  ) {
    this.root = root;
    this.rootSchema = null;
    this.rawDB = rawDB;
    this.elasticClient = elasticClient;
    this.langAnalyzers = langAnalyzers;
    this.serverData = null;

    this.serverDataPromise = new Promise((r) => {
      this.serverDataPromiseResolve = r;
    });
  }

  public async informNewServerData(serverData: any) {
    const shouldResolvePrmomise = !this.serverData;
    this.serverData = serverData;
    this.rootSchema = getElasticSchemaForRoot(this.root, this.serverData);

    if (shouldResolvePrmomise) {
      this.serverDataPromiseResolve();
    }
  }

  private async waitForServerData() {
    if (this.serverData) {
      return;
    }

    await this.serverDataPromise;
  }

  /**
   * Prepares the itemize instance so that all the necessary meta indexes are contained
   * and checks wether existant indexes match the shape, this can take a very long time
   */
  public async prepareInstance(): Promise<void> {
    const modsQueued: Module[] = [];
    const modsSolvedByIdef: Module[] = [];
    await Promise.all(this.root.getAllModules().map(async (rootMod) => {
      if (rootMod.isSearchEngineEnabled()) {
        modsQueued.push(rootMod);
      }
      return await Promise.all(
        rootMod.getAllChildDefinitionsRecursive().map(async (cIdef) => {
          const parentMod = cIdef.getParentModule();
          if (parentMod.isSearchEngineEnabled() && !modsQueued.includes(parentMod)) {
            modsSolvedByIdef.push(rootMod);
          }
          if (cIdef.isSearchEngineEnabled()) {
            await this.rebuildIndex(cIdef);
          }
        })
      );
    }));

    await Promise.all(modsQueued.map(async (mod) => {
      if (!modsSolvedByIdef.includes(mod)) {
        await this.rebuildIndex(mod);
      }
    }));
  }

  /**
   * Returns when it believes elastic has been built and is ready
   * use in other than the global manager
   * @returns 
   */
  public async confirmInstanceReadiness(): Promise<void>  {
    return null;
  }

  private async retrieveCurrentSchemaDefinition(
    qualifiedName: string,
  ) {

  }

  private async upsertSchemaDefinition(
    qualifiedName: string,
    value: IElasticSchemaDefinitionType,
  ) {

  }

  /**
   * Builds an index from scratch
   */
  public async rebuildIndex(
    itemDefinitionOrModule: string | ItemDefinition | Module,
    force?: boolean,
  ): Promise<void> {
    await this.waitForServerData();

    const idefOrMod = typeof itemDefinitionOrModule === "string" ? this.root.registry[itemDefinitionOrModule] : itemDefinitionOrModule;
    const limiters = idefOrMod.getRequestLimiters();
    const sinceLimiter = (limiters && limiters.since) || null;
    const qualifiedName = idefOrMod.getQualifiedPathName();

    const schemaToBuild = this.rootSchema[qualifiedName];

    console.log(schemaToBuild);

    return null;
  }

  /**
   * Forces a given index to be removed
   */
  public async deleteIndex(itemDefinitionOrModule: string | ItemDefinition | Module): Promise<void> {
    return null;
  }

  /**
   * Updates a document for a given index
   * if the index does not exist the whole operation is ingored and instead
   * a rebuild operation is launched for the given index (which should fetch everything up to date)
   */
  public async updateDocument(
    itemDefinitionOrModule: string | ItemDefinition | Module,
    language: string,
    value: ISQLTableRowValue,
  ): Promise<void> {
    return null;
  }

  /**
   * Performs a select operation at the given index
   * @param itemDefinitionOrModule 
   * @param selecter 
   */
  public async performElastiSelect(
    itemDefinitionOrModule: ItemDefinition | Module | string,
    selecter: (builder: any) => void,
  ) {
    
  }
}