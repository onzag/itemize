/**
 * This is a very important class that contains the whole redis
 * wrapping that basically keeps everything synchronized, all the servers
 * and tells the clients that are connected to this specific instance, it provides
 * functionality to update, create and delete item definition values
 *
 * @packageDocumentation
 */
import { RedisClient } from "redis";
import Knex from "knex";
import { ISQLTableRowValue } from "../base/Root/sql";
import { IGQLSearchResult, IGQLArgs, IGQLValue } from "../gql-querier";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { Listener } from "./listener";
import Root from "../base/Root";
import { PkgCloudContainers } from ".";
/**
 * The cache class that provides all the functionality that is
 * specified for the cache package, the cache is more than what
 * it name implies because it contains redis and it's the same in
 * all the servers
 */
export declare class Cache {
    private redisClient;
    private knex;
    private uploadsContainers;
    private root;
    private listener;
    /**
     * Builds a new cache instance, before the cache is ready
     * it needs to be able to access the listener as well, but due
     * to the fact that the listener depends on the cache as well
     * it is instantiaded by te listener at the same time
     *
     * @param redisClient the redis client that is used for storing values
     * @param knex the knex instance
     * @param root the root of itemize
     */
    constructor(redisClient: RedisClient, knex: Knex, uploadsContainers: PkgCloudContainers, root: Root);
    /**
     * Sets the listener for the remote interaction with the clients
     * that are connected, this listener is what informs the client of updates
     * the listener is highly related to the cache as it uses pubsub that
     * comes from redis
     * @param listener the listener
     */
    setListener(listener: Listener): void;
    /**
     * A private function that provides a cached value from its identifier
     * @param idefQueryIdentifier the identifier
     * @returns a promise with the sql value
     */
    private getIdefCachedValue;
    /**
     * Resets the expiration clock of a given identifier
     * @param keyIdentifier the identifier
     */
    private pokeCache;
    /**
     * forces a cached value for a given item definition table in an id and version
     * @param idefTable the item definition table or its qualified name
     * @param id the id
     * @param version the version or null
     * @param value the value to store
     */
    private forceCacheInto;
    /**
     * Request the creation of a new item definition value for an specific item definition
     * @param itemDefinition the item definition we refer to
     * @param forId an optional (or null) value for the id that is meant to be created for, when
     * forId is used the item should exist, note that the cache doesn't check for any of this
     * @param version an optional (or null) version for the item definition
     * @param value the value to create, the value can be partial
     * @param createdBy the creator of this item, it can be null, in which case the creator would be left unspecified
     * @param dictionary the dictionary to use, this can be left null as well when no text field is present but it is
     * recommended to be set, represents a postgresql dictionary for building text indexes
     * @param parent the parent of this item, can be left null, note that no checks for parenting are done it will
     * just execute
     * @param parent.id the parent id
     * @param parent.version the parent version
     * @param parent.type the parent type
     * @returns a total sql combined row value that can be converted into grapqhl
     */
    requestCreation(itemDefinition: ItemDefinition, forId: number, version: string, value: IGQLArgs, createdBy: number, dictionary: string, containerId: string, parent: {
        id: number;
        version: string;
        type: string;
    }): Promise<ISQLTableRowValue>;
    /**
     * Requests an update for an item definition where new values are set for this existent item
     * definition value, these are taken as instructions and no checks are done on it
     * @param itemDefinition the item definition in question
     * @param id the id to update
     * @param version the version of that id to update
     * @param update the update in question (partial values are allowed)
     * @param currentValue a current value as graphql, the current value can be requested from the
     * cache itself, and then converted into graphql, but this is expensive, while for the edit process
     * this is done anyway because of checks, if you are running this manually you might not need to pass these
     * the reason current value are necessary is in order to perform a diffing operation and remove orphan files
     * if your update process doesn't leave orphan files, as in you are not updating any file field, you can
     * pass null to the current value
     * @param editedBy the editor id, this causes the edited_at and edited_by field to change, however you can pass
     * null to this value in order to mark it as computer edited rather than edited by an user
     * @param dictionary the dictionary to use, just like the current value this is only relevant if you are
     * updating full text search enabled fields, if that is not the case, you can pass null to the dictionary, but
     * be careful
     * @param containerId the container id where this item is stored, please when using update ensure to select the same
     * container that the item is already created otherwise this will break the uploads and make them unreachable
     * if you are passing no uploads it's safe to leave as null
     * @param listenerUUID the listener uuid, from the listener, this ensures that the executor of this action doesn't
     * get a notification, you can pass null for this if this is a computer operation and let every listener to be informed
     * while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the
     * listener uuid ensures only those that needs updates will get them
     * @returns a total combined table row value that can be converted into graphql
     */
    requestUpdate(itemDefinition: ItemDefinition, id: number, version: string, update: IGQLArgs, currentValue: IGQLValue, editedBy: number, dictionary: string, containerId: string, listenerUUID: string): Promise<ISQLTableRowValue>;
    /**
     * Request the deletition of an item definition value
     * @param itemDefinition the item definition to delete a value for
     * @param id the id to delete for
     * @param version the version to delete for
     * @param dropAllVersions whether to drop all versions
     * @param containerId the container id where these files are currently stored, ensure to pass the exact same one
     * unsafe not to pass so it's required
     * @param listenerUUID the listener uuid, from the listener, this ensures that the executor of this action doesn't
     * get a notification, you can pass null for this if this is a computer operation and let every listener to be informed
     * while it doesn't hurt to keep listenerUUID as null, it is expensive to send messages when they will be of no use the
     * listener uuid ensures only those that needs updates will get them
     */
    requestDelete(itemDefinition: ItemDefinition, id: number, version: string, dropAllVersions: boolean, containerId: string, listenerUUID: string): Promise<void>;
    /**
     * Requests a value from the cache
     * @param itemDefinition the item definition or a [qualifiedItemDefinitionName, qualifiedModuleName] combo
     * @param id the id to request for
     * @param version the version
     * @param refresh whether to skip the cache and request directly from the database and update the cache
     * @returns a whole sql value that can be converted into graphql if necessary
     */
    requestValue(itemDefinition: ItemDefinition | [string, string], id: number, version: string, refresh?: boolean): Promise<ISQLTableRowValue>;
    /**
     * TODO Optimize this, right now it retrieves the list one by one
     * Requests a whole list of search results
     * @param ids the ids to request for
     * @returns a list of whole sql combined table row values
     */
    requestListCache(ids: IGQLSearchResult[]): Promise<ISQLTableRowValue[]>;
    /**
     * This function triggers once the remote listener has detected a change that has been done by
     * another server instance to a value that we are supposedly currently holding in memory
     * @param itemDefinition the item definition qualified name
     * @param id the id of such
     * @param version the version or null
     * @param data the entire SQL result
     */
    onChangeInformed(itemDefinition: string, id: number, version: string, data: ISQLTableRowValue): void;
}
