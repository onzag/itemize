import read from "read";
export declare function request(options: read.Options): Promise<{
    result: string;
    isDefault: boolean;
}>;
declare type FieldRequestType = "strarray" | "string" | "integer" | "strobject";
export declare function fieldRequest<T>(type: FieldRequestType, message: string, variableName: string, basedOnValue: T, defaultValue: T, hidden?: boolean, validate?: (value: T) => boolean): Promise<T>;
interface IConfigRequestExtractPoint {
    type?: FieldRequestType | "config";
    extractData?: Array<IConfigRequestExtractPoint>;
    variableName: string;
    message: string;
    defaultValue: any;
    hidden?: boolean;
    validate?: (config: any, value: any) => boolean;
}
export declare function configRequest<T>(srcConfig: T, message: string, extractData: Array<IConfigRequestExtractPoint>, variableNamePrefix?: string): Promise<T>;
export declare function confirm(question: string): Promise<boolean>;
export {};
