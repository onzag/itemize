import * as colors from 'colors/safe';

export class CheckUpError extends Error {
  traceback: Traceback;

  constructor(
    message: string,
    traceback: Traceback
  ){
    super(message);

    this.traceback = traceback;

    Object.setPrototypeOf(this, CheckUpError.prototype);
  }

  display(){
    console.log(colors.red(this.message));
    this.traceback.display();
  }
}

interface TracebackStackBitType {
  path: string,
  lineStart: number,
  posStart: number,
  lineEnd: number,
  posEnd: number
}

function extractPointData(path: string, pointData: any):TracebackStackBitType {
  let lineStart =
    pointData.key ? pointData.key.line : pointData.value.line;
    pointData.key ? pointData.key.column : pointData.value.column;
  let posStart =
    pointData.key ? pointData.key.pos : pointData.value.pos;
  let lineEnd = pointData.valueEnd.line;
  let posEnd = pointData.valueEnd.pos;

  return {
    path,
    lineStart,
    lineEnd,
    posStart,
    posEnd
  }
}

export class Traceback {
  public stack: Array<TracebackStackBitType>;
  private parentTraceback: Traceback;
  private location: string;
  private pointers: any;
  private rawContent: string;
  constructor(
    location: string,
    pointers?: any,
    rawContent?: string,
    parentTraceback?: Traceback,
    source?: Array<TracebackStackBitType>
  ){
    this.location = location;
    this.parentTraceback = parentTraceback;
    this.pointers = pointers;
    this.rawContent = rawContent;

    if (source){
      this.stack = [...source];
    } else {
      this.stack = [];
    }
  }
  append(bit: TracebackStackBitType){
    this.stack.push(bit);
  }
  newTraceToBit(pathId: string | number){
    if (!this.pointers){
      throw new Error("Attempted to trace to bit without pointer data");
    }
    let newTraceback = new Traceback(
      this.location,
      this.pointers,
      this.rawContent,
      this.parentTraceback,
      this.stack
    );
    let lastStackLocation = this.stack[this.stack.length - 1];
    let newPath = lastStackLocation.path + "/" + pathId;
    let pointData = this.pointers[newPath];
    if (!pointData){
      throw new Error("Attempted to get point data for invalid " + newPath);
    }
    newTraceback.append(extractPointData(newPath, pointData));
    return newTraceback;
  }
  newTraceToLocation(location: string){
    return new Traceback(location, null, null, this);
  }
  setupPointers(pointers: any, rawContent: string){
    this.pointers = pointers;
    let pointData = this.pointers[''];
    if (!pointData){
      throw new Error("No default data for set up pointers");
    }
    this.rawContent = rawContent;
    this.append(extractPointData('', pointData));
  }
  display(requested?: boolean){
    if (!requested && this.rawContent && this.stack.length){
      let lastBit = this.stack[this.stack.length - 1];
      let beforeMatch = this.rawContent.substr(0, lastBit.posStart);
      let matchData = this.rawContent.substr(
        lastBit.posStart,
        lastBit.posEnd - lastBit.posStart
      );
      let afterMatch = this.rawContent.substr(lastBit.posEnd);

      let processedValue = colors.green(beforeMatch) +
        colors.red(colors.underline(matchData)) + colors.green(afterMatch);

      let processedValueLines = processedValue.split("\n");

      let minLine = lastBit.lineStart - 1;
      if (minLine < 0){
        minLine++;
      }

      let maxLine = lastBit.lineEnd + 1;
      if (maxLine > processedValueLines.length){
        maxLine--;
      }

      let resultingLines = processedValueLines.slice(minLine, maxLine + 1)

      console.log(resultingLines
        .map((line, index)=>
          `${colors.yellow(minLine + index + 1 + "")}\t${line}`)
        .join("\n"));
    }
    console.log((requested ? "REQUESTED BY file " : "AT file ") +
      colors.red(this.location));
    this.stack.reverse().forEach(bit=>{
      console.log("\tAT line " +
        colors.yellow(bit.lineStart+1 + "") +
        " ON " + colors.red(bit.path ? bit.path : "/"))
    });

    if (this.parentTraceback){
      this.parentTraceback.display(true);
    }
  }
}
