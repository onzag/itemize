import PropertyDefinition from ".";
import sharp from "sharp";
import fs from "fs";
import path from "path";
const fsAsync = fs.promises;

interface IOuputImageConversion {
  name: string;
  fit: "cover" | "contain" | "fill";
  width: number;
  height: number;
}

function singleOptionAnalysis(
  value: string,
  enforcedName?: string,
): IOuputImageConversion {
  if (value === null) {
    return null;
  }

  const splitted = value.trim().split(" ");
  let name: string;
  if (enforcedName) {
    name = enforcedName;
  } else {
    name = splitted.shift() || null;
  }

  if (!name) {
    return null;
  }

  const widthXheight = splitted.shift() || null;
  const width = parseInt(widthXheight && widthXheight.split("x")[0], 10) || null;
  const height = parseInt(widthXheight && widthXheight.split("x")[1], 10) || null;

  if (!width && !height) {
    return null;
  }

  let fit: any = splitted.shift() || null;
  if (
    fit !== "cover" &&
    fit !== "contain" &&
    fit !== "fill"
  ) {
    fit = "cover";
  }

  return {
    name,
    width,
    height,
    fit,
  };
}

function manyOptionsAnalysis(value: string): IOuputImageConversion[] {
  return value.split(";").map((subvalue) => singleOptionAnalysis(subvalue)).filter((v) => !!v);
}

export async function runImageConversions(
  fileName: string,
  filePath: string,
  propDef: PropertyDefinition,
) {
  const smallAnalyzed: IOuputImageConversion = singleOptionAnalysis(
    propDef.getSpecialProperty("smallDimension") as string,
    "small",
  ) || {
    name: "small",
    width: 96,
    height: 96,
    fit: "cover",
  };
  const mediumAnalyzed: IOuputImageConversion = singleOptionAnalysis(
    propDef.getSpecialProperty("mediumDimension") as string,
    "medium",
  ) || {
    name: "medium",
    width: 128,
    height: 128,
    fit: "cover",
  };
  const largeAnalyzed: IOuputImageConversion = singleOptionAnalysis(
    propDef.getSpecialProperty("largeDimension") as string,
    "large",
  ) || {
    name: "large",
    width: 256,
    height: 256,
    fit: "cover",
  };
  let outputs: IOuputImageConversion[] = [
    smallAnalyzed,
    mediumAnalyzed,
    largeAnalyzed,
  ];
  const allRemainingSizes = propDef.getSpecialProperty("dimensions") as string;
  if (allRemainingSizes) {
    outputs = outputs.concat(manyOptionsAnalysis(allRemainingSizes));
  }

  const fileBuffer = await fsAsync.readFile(
    filePath,
  );

  const fileNameNoExtension = path.basename(fileName, path.extname(fileName));
  const dirName = path.dirname(filePath);

  await Promise.all(
    outputs.map((output) => {
      const ouputFileName = path.join(dirName, output.name + "_" + fileNameNoExtension + ".jpg");
      return sharp(fileBuffer).resize(output.width, output.height, {
        fit: output.fit,
      }).jpeg().toFile(ouputFileName);
    }),
  );
}
