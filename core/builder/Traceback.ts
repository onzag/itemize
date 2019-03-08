import * as colors from "colors/safe";
import "source-map-support/register";

interface ITracebackStackBitType {
  path: string;
  lineStart: number;
  posStart: number;
  lineEnd: number;
  posEnd: number;
}

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

export default class Traceback {
  public stack: ITracebackStackBitType[];
  private parentTraceback: Traceback;
  private location: string;
  private pointers: any;
  private rawContent: string;
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

  public append(bit: ITracebackStackBitType) {
    this.stack.push(bit);
  }

  public newTraceToBit(pathId: string | number) {
    if (!this.pointers) {
      throw new Error("Attempted to trace to bit without pointer data");
    }
    const newTraceback = new Traceback(
      this.location,
      this.pointers,
      this.rawContent,
      this.parentTraceback,
      this.stack,
    );

    const lastStackLocation = this.stack[this.stack.length - 1];
    const newPath = lastStackLocation.path + "/" + pathId;
    const pointData = this.pointers[newPath];
    if (!pointData) {
      throw new Error("Attempted to get point data for invalid " + newPath);
    }
    newTraceback.append(extractPointData(newPath, pointData));
    return newTraceback;
  }

  public newTraceToLocation(location: string) {
    return new Traceback(location, null, null, this);
  }

  public setupPointers(pointers: any, rawContent: string) {
    this.pointers = pointers;
    const pointData = this.pointers[""];
    if (!pointData) {
      throw new Error("No default data for set up pointers");
    }
    this.rawContent = rawContent;
    this.append(extractPointData("", pointData));
  }

  public display(requested?: boolean) {
    if (!requested && this.rawContent && this.stack.length) {
      const lastBit = this.stack[this.stack.length - 1];
      const beforeMatch = this.rawContent.substr(0, lastBit.posStart);
      const matchData = this.rawContent.substr(
        lastBit.posStart,
        lastBit.posEnd - lastBit.posStart,
      );
      const afterMatch = this.rawContent.substr(lastBit.posEnd);

      const processedValue = colors.green(beforeMatch) +
        colors.red(colors.underline(matchData)) + colors.green(afterMatch);

      const processedValueLines = processedValue.split("\n");

      let minLine = lastBit.lineStart - 1;
      if (minLine < 0) {
        minLine++;
      }

      let maxLine = lastBit.lineEnd + 1;
      if (maxLine > processedValueLines.length) {
        maxLine--;
      }

      const resultingLines = processedValueLines.slice(minLine, maxLine + 1);

      console.log(resultingLines
        .map((line, index) =>
          `${colors.yellow(minLine + index + 1 + "")}\t${line}`)
        .join("\n"));
    }
    console.log((requested ? "REQUESTED BY file " : "AT file ") +
      colors.red(this.location));
    this.stack.reverse().forEach((bit) => {
      console.log("\tAT line " +
        colors.yellow(bit.lineStart + 1 + "") +
        " ON " + colors.red(bit.path ? bit.path : "/"));
    });

    if (this.parentTraceback) {
      this.parentTraceback.display(true);
    }
  }
}
