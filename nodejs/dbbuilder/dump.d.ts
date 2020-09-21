/**
 * Contains the dumper that dumps the database fractionally so that
 * it can be reloaded (refreshed)
 *
 * @packageDocumentation
 */
import Knex from "knex";
import Root from "../base/Root";
/**
 * Actually runs the dump
 */
export default function dump(version: string, knex: Knex, root: Root): Promise<void>;
