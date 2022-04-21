import type { Client } from "@elastic/elasticsearch";
import type ItemDefinition from "../base/Root/Module/ItemDefinition";
import type Module from "../base/Root/Module";
import type { ItemizeRawDB } from "./raw-db";
import type Root from "../base/Root";
import type { ISQLTableRowValue } from "../base/Root/sql";

export class ItemizeElasticClient {
  public elasticClient: Client;
  private rawDB: ItemizeRawDB;
  private root: Root;

  constructor(
    root: Root,
    rawDB: ItemizeRawDB,
    elasticClient: Client,
  ) {
    this.root = root;
    this.rawDB = rawDB;
    this.elasticClient = elasticClient;
  }

  /**
   * Prepares the itemize instance so that all the necessary meta indexes are contained
   * and checks wether existant indexes match the shape, this can take a very long time
   */
  public async prepareInstance(): Promise<void> {
    return null;
  }

  /**
   * Forces a given index to be rebuild from scratch
   */
  public async rebuildIndex(itemDefinitionOrModule: string | ItemDefinition | Module): Promise<void> {
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