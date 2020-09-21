/**
 * Contains the builder that builds the database based on the schema
 * that is generated during the compiltation process
 *
 * @packageDocumentation
 */
/**
 * Simple function to ask for a question
 * @param question the question to ask
 * @returns a boolean on the answer
 */
export declare function yesno(question: string): any;
/**
 * Actually runs the build
 */
export default function build(version: string, action?: "build" | "dump" | "load-dump"): Promise<void>;
export declare function showErrorStackAndLogMessage(err: Error): void;
