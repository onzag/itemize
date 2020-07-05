import pkgcloud from "pkgcloud";
import { ISEORuleSet } from ".";
export declare class SEOGenerator {
    private container;
    private prefix;
    private rules;
    private supportedLanguages;
    constructor(rules: ISEORuleSet, container: pkgcloud.storage.Container, prefix: string, supportedLanguages: string[]);
    run(): Promise<void>;
    private runHeadRequest;
    private checkIndexFile;
    private runFor;
}
