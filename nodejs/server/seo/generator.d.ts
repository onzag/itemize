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
    private pingGoogle;
    private primaryIndex;
    private mainIndex;
    private cache;
    constructor(rules: ISEORuleSet, container: pkgcloud.storage.Container, knex: Knex, root: Root, prefix: string, supportedLanguages: string[], hostname: string, pingGoogle: boolean);
    run(): Promise<void>;
    private runHeadRequest;
    private runGetRequest;
    private writeFile;
    private writeSitemapFile;
    private checkIndexFile;
    private runFor;
    private defaultParametrizer;
}
