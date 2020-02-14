/**
 * The traceback class is in charge of showing and tracing errors
 * from a given file and content extracted by the json parse map
 * in order to tell developers where they have messed up the schema
 * definition of itemize
 *
 * @packageDocumentation
 */
import "source-map-support/register";
/**
 * Traceback information that relates to the given
 * file where the traceback is in
 */
interface ITracebackStackBitType {
    /**
     * The pointer path
     */
    path: string;
    /**
     * The line row where the pointer starts
     */
    lineStart: number;
    /**
     * The position column where the pointer starts
     */
    posStart: number;
    /**
     * The line row where the pointer ends
     */
    lineEnd: number;
    /**
     * The position column where the pointer ends
     */
    posEnd: number;
}
/**
 * The traceback class
 */
export default class Traceback {
    /**
     * The stack contains all the traceback bits that have been accumulating
     */
    stack: ITracebackStackBitType[];
    /**
     * A parent traceback, as traceback stacks are mostly meant to be static
     * they can be chained as a history
     */
    private parentTraceback;
    /**
     * The location of this specific traceback
     */
    private location;
    /**
     * The json map pointers that were used, if any
     */
    private pointers;
    /**
     * The raw string content of the file
     */
    private rawContent;
    /**
     * In order to build a traceback we need
     * @param location the location of the file
     * @param pointers the pointers of the file, if any
     * @param rawContent the raw content of that file, if any
     * @param parentTraceback the parent traceback if any
     * @param source a story that the traceback can already tell
     */
    constructor(location: string, pointers?: any, rawContent?: string, parentTraceback?: Traceback, source?: ITracebackStackBitType[]);
    /**
     * Adds a traceback bit to the traceback
     * @param bit the bit to add
     */
    append(bit: ITracebackStackBitType): void;
    /**
     * Traces to a new bit into the pointers
     * @param pathId the path that it traces to
     * @returns a new traceback object that traces to that bit
     */
    newTraceToBit(pathId: string | number): Traceback;
    /**
     * provides a new traceback that points to a new location parented
     * by this traceback
     * @param location the location that it is tracing
     * @returns a new traceback pointing to a new location, the traceback
     * has no pointers, nor file raw data
     */
    newTraceToLocation(location: string): Traceback;
    /**
     * Initializes the pointers for json tree tracking that
     * are necessary to provide tracebacks in json files
     * @param pointers the pointers
     * @param rawContent the raw content of the file
     */
    setupPointers(pointers: any, rawContent: string): void;
    /**
     * Displays the traceback via the console
     * @param requested whether to say that the file was requested by and do not display details
     */
    display(requested?: boolean): void;
}
export {};
