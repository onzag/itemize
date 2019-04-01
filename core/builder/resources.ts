import * as fs from "fs";
import * as path from "path";
import * as colors from "colors/safe";
const fsAsync = fs.promises;

export async function buildJSONResources(rawConfig: any) {
  const jsons = (await fsAsync.readdir("resources"))
    .filter((i) => i.endsWith(".json"));

  await Promise.all(jsons.map(async (jsonName) => {
    const content = await fsAsync.readFile(path.join("resources", jsonName), "utf8");
    const minified = JSON.stringify(JSON.parse(content));
    const fileName = path.join("dist", "data", jsonName);
    console.log("emiting " + colors.green(fileName));
    await fsAsync.writeFile(fileName, minified);
  }));
}
