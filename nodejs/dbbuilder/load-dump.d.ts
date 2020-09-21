import Knex from "knex";
import Root from "../base/Root";
export default function loadDump(version: string, knex: Knex, root: Root): Promise<void>;
