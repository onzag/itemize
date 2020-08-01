/**
 * Utility to execute commands in sh, even in sudo mode
 * @packageDocumentation
 */
/**
 * Simply does an exec
 * @param code the code we execute
 * @returns a void promise
 */
export declare function execAsync(code: string): Promise<unknown>;
/**
 * Does the same as execAsync but with sudo provileges
 * @param code the code to execute
 * @param name the name we are giving this application
 * @param icns
 * @returns a void promise
 */
export declare function execSudo(code: string, name: string, icns?: string): Promise<unknown>;
