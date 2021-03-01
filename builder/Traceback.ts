/**
 * The traceback class is in charge of showing and tracing errors
 * from a given file and content extracted by the json parse map
 * in order to tell developers where they have messed up the schema
 * definition of itemize
 *
 * @module
 */

import colors from "colors/safe";
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
 * Extracts the point information in order to provide a traceback bit
 * from the pointer info
 * @param path the path that we are extracting form
 * @param pointData the information that path contains
 */
function extractPointData(path: string, pointData: any): ITracebackStackBitType {
  const lineStart =
    pointData.key ? pointData.key.line : pointData.value.line;
  const posStart =
    pointData.key ? pointData.key.pos : pointData.value.pos;
  const lineEnd = pointData.valueEnd.line;
  const posEnd = pointData.valueEnd.pos;

  return {
    path,
    lineStart,
    lineEnd,
    posStart,
    posEnd,
  };
}

/**
 * The traceback class
 */
export default class Traceback {
  /**
   * The stack contains all the traceback bits that have been accumulating
   */
  public stack: ITracebackStackBitType[];
  /**
   * A parent traceback, as traceback stacks are mostly meant to be static
   * they can be chained as a history
   */
  private parentTraceback: Traceback;
  /**
   * The location of this specific traceback
   */
  private location: string;
  /**
   * The json map pointers that were used, if any
   */
  private pointers: any;
  /**
   * The raw string content of the file
   */
  private rawContent: string;
  /**
   * In order to build a traceback we need
   * @param location the location of the file
   * @param pointers the pointers of the file, if any
   * @param rawContent the raw content of that file, if any
   * @param parentTraceback the parent traceback if any
   * @param source a story that the traceback can already tell
   */
  constructor(
    location: string,
    pointers?: any,
    rawContent?: string,
    parentTraceback?: Traceback,
    source?: ITracebackStackBitType[],
  ) {
    this.location = location;
    this.parentTraceback = parentTraceback;
    this.pointers = pointers;
    this.rawContent = rawContent;

    if (source) {
      this.stack = [...source];
    } else {
      this.stack = [];
    }
  }

  /**
   * Adds a traceback bit to the traceback
   * @param bit the bit to add
   */
  public append(bit: ITracebackStackBitType) {
    this.stack.push(bit);
  }

  /**
   * Traces to a new bit into the pointers
   * @param pathId the path that it traces to
   * @returns a new traceback object that traces to that bit
   */
  public newTraceToBit(pathId: string | number) {
    // you cannot trace without pointers
    if (!this.pointers) {
      throw new Error("Attempted to trace to bit without pointer data");
    }
    // let's build the new traceback, we are basically cloning here
    const newTraceback = new Traceback(
      this.location,
      this.pointers,
      this.rawContent,
      this.parentTraceback,
      this.stack,
    );

    // let's get the last stack location of this stack
    const lastStackLocation = this.stack[this.stack.length - 1];
    // and get the absolute path
    const newPath = lastStackLocation.path + "/" + pathId;
    // in order to extract the path location from the pointers
    const pointData = this.pointers[newPath];
    // if there's no point data
    if (!pointData) {
      // something bad happened
      throw new Error("Attempted to get point data for invalid " + newPath);
    }
    // otherwise we get the stack bit for that point of the new path
    // and add it to the new traceback, growing its stack
    newTraceback.append(extractPointData(newPath, pointData));
    // return it
    return newTraceback;
  }

  /**
   * provides a new traceback that points to a new location parented
   * by this traceback
   * @param location the location that it is tracing
   * @returns a new traceback pointing to a new location, the traceback
   * has no pointers, nor file raw data
   */
  public newTraceToLocation(location: string) {
    return new Traceback(location, null, null, this);
  }

  /**
   * Initializes the pointers for json tree tracking that
   * are necessary to provide tracebacks in json files
   * @param pointers the pointers
   * @param rawContent the raw content of the file
   */
  public setupPointers(pointers: any, rawContent: string) {
    this.pointers = pointers;
    const pointData = this.pointers[""];
    if (!pointData) {
      throw new Error("No default data for set up pointers");
    }
    this.rawContent = rawContent;
    // we get setup in the root of the file
    this.append(extractPointData("", pointData));
  }

  /**
   * Displays the traceback via the console
   * @param requested whether to say that the file was requested by and do not display details
   */
  public display(requested?: boolean) {
    // if this is not the topmost display and this is a requested display
    // note we check for raw content and a stack because eg. properties file
    // do not have those
    if (!requested && this.rawContent && this.stack.length) {
      // then we got to check what our last bit is
      const lastBit = this.stack[this.stack.length - 1];
      // find all the content before from the raw content
      const beforeMatch = this.rawContent.substr(0, lastBit.posStart);
      // get our matching data
      const matchData = this.rawContent.substr(
        lastBit.posStart,
        lastBit.posEnd - lastBit.posStart,
      );
      // find all the content after
      const afterMatch = this.rawContent.substr(lastBit.posEnd);

      // so now let's make it colorful, however this thing is
      // the entire json file, we should try to strip too many
      // line numbers
      const processedValue = colors.green(beforeMatch) +
        colors.red(colors.underline(matchData)) + colors.green(afterMatch);

      // so we split in rows
      const processedValueLines = processedValue.split("\n");

      // and let's try to setup a minimum line
      let minLine = lastBit.lineStart - 1;
      if (minLine < 0) {
        minLine++;
      }

      // and a maximum line that doesn't exceed the rows
      let maxLine = lastBit.lineEnd + 1;
      if (maxLine > processedValueLines.length) {
        maxLine--;
      }

      // and now let's remove all the extra lines
      const resultingLines = processedValueLines.slice(minLine, maxLine + 1);

      // now let's log it, with nice line numbers
      console.log(resultingLines
        .map((line, index) =>
          `${colors.yellow(minLine + index + 1 + "")}\t${line}`)
        .join("\n"));
    }

    // and now let's show the requested or at file message
    console.log((requested ? "REQUESTED BY " : "AT ") +
      colors.red(this.location));

    // and let's reverse the stack to give line numbers and paths
    this.stack.reverse().forEach((bit) => {
      console.log("\tAT line " +
        colors.yellow(bit.lineStart + 1 + "") +
        " ON " + colors.red(bit.path ? bit.path : "/"));
    });

    // if we have a parent traceback that belongs to another location
    if (this.parentTraceback) {
      // display that as well as requested file
      this.parentTraceback.display(true);
    }
  }
}
