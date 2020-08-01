/**
 * Constains function to read information from the console in order to be used
 * during the setup process
 *
 * @packageDocumentation
 */
import read from "read";
/**
 * requests a single value
 * @param options the read options
 */
export declare function request(options: read.Options): Promise<{
    result: string;
    isDefault: boolean;
}>;
/**
 * The types we are allowed to request
 * string is just a plain string
 * integer is a number integer
 * strarray is an array of string
 * strobject is an object with strings in it
 */
declare type FieldRequestType = "strarray" | "string" | "integer" | "strobject";
/**
 * This function allows us to request one of the field types
 * @param type the type we are requesting
 * @param message the message we want to show
 * @param variableName the variable name we are setting
 * @param basedOnValue basically a previously assigned value we want to modify for this
 * @param defaultValue the default value for this
 * @param hidden whether we shouldn't display the characters for it to avoid logs
 * @param validate a function to validate the value
 * @param nullifyFalseValues whether we should make values that don't pass the if (value) check, null, basically empty string and 0
 * @returns the value it was read
 */
export declare function fieldRequest<T>(type: FieldRequestType, message: string, variableName: string, basedOnValue: T, defaultValue: T, hidden?: boolean, validate?: (value: T) => boolean, nullifyFalseValues?: boolean): Promise<T>;
/**
 * The form that allows to define how we are requesting an entire configuration
 */
export interface IConfigRequestExtractPoint {
    /**
     * What we are reading, it can be a simple type, a configuration, on a object
     * of configuration, or a multiconfig, basically has keys for many configuration
     * if no type specified, it will consider it a string
     */
    type?: FieldRequestType | "config" | "multiconfig";
    /**
     * The data we are extracting for, note that it's an array
     * as it defines how we extract this data, it defines all the variables
     * we are defining in this config or multiconfig,
     * this will not be used in standard field request types as it defines nothing
     */
    extractData?: Array<IConfigRequestExtractPoint>;
    /**
     * The variable name we are defining for this, since this represents a single
     * variable in a json structure
     */
    variableName: string;
    /**
     * The message we should display for it
     */
    message: string;
    /**
     * The default value only supported for
     * standard types and not config or multiconfig
     */
    defaultValue?: any;
    /**
     * Whether the value is hidden, only supported
     * for standard types
     */
    hidden?: boolean;
    /**
     * A validate function where value is the value
     * and config is the current config being built under
     * this where the variable is stored
     * This is only used for standard values and not config or multiconfig
     */
    validate?: (value: any, config: any) => boolean;
    /**
     * Whether to nullify false values, only used
     * for standard fields
     */
    nullifyFalseValues?: boolean;
}
/**
 * Performs a config request for entry an entire config
 * @param srcConfig the source configuration
 * @param message the message to show
 * @param extractData the ata to extract
 * @param variableNamePrefix a prefix to prefix all variable names
 */
export declare function configRequest<T>(srcConfig: T, message: string, extractData: Array<IConfigRequestExtractPoint>, variableNamePrefix?: string): Promise<T>;
/**
 * Ask for confirmation given a message
 * @param question the question to ask
 * @returns a promise for a boolean
 */
export declare function confirm(question: string): Promise<boolean>;
export {};
