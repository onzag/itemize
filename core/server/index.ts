import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";
const fsAsync = fs.promises;

const app = express();

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

app.get("/resource/:resource", (req, res) => {
  const resourceName: string = req.params.resource;
  if (resourceName.indexOf("..") !== -1) {
    res.setHeader("Content-Type", "text/plain");
    res.end("Uh! uh! :) Directory Traversal Attack Denied :D");
  }
  res.sendFile(path.resolve(__dirname + `../../../data/${req.params.resource}`));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "../../../data/index.html"));
});

(async () => {
  const config: any = JSON.parse(
    await fsAsync.readFile("./dist/config.json", "utf8"),
  );

  http.createServer(app).listen(config.port, () => {
    console.log("listening at", config.port);
  });
})();
