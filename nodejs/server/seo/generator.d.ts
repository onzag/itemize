import pkgcloud from "pkgcloud";
import { ISEORuleSet } from ".";
import Knex from "knex";
import Root from "../../base/Root";
export declare class SEOGenerator {
    private root;
    private knex;
    private container;
    private prefix;
    private rules;
    private supportedLanguages;
    private hostname;
    private primaryIndex;
    private mainIndex;
    private cache;
    constructor(rules: ISEORuleSet, container: pkgcloud.storage.Container, knex: Knex, root: Root, prefix: string, supportedLanguages: string[], hostname: string);
    run(): Promise<void>;
    private runHeadRequest;
    private runGetRequest;
    private writeFile;
    private writeSitemapFile;
    private checkIndexFile;
    private runFor;
    private defaultParametrizer;
}
