import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as fs from "fs";
const fsAsync = fs.promises;

const app = express();
let config: any = null;
let countries: any = null;

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

app.get("/util/country", (req, res) => {
  // Only occurs during development
  res.setHeader("contentType", "application/json");

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1") {
    res.end(JSON.stringify({
      country: "FI",
      currency: "EUR",
      language: "fi",
    }));
    return;
  }

  // Occurs during production
  http.get(`http://api.ipstack.com/${ip}?access_key=${config.ipStackAccessKey}`, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
    resp.on("end", () => {
      const parsedData = JSON.parse(data);
      res.end(JSON.stringify({
        country: parsedData.country_code,
        currency: countries[parsedData.country_code] ? countries[parsedData.country_code].currency || "EUR" : "EUR",
        language: parsedData.languages[0] ? parsedData.languages[0].code :
          (countries[parsedData.country_code] ? countries[parsedData.country_code].languages[0] || "en" : "en"),
      }));
    });
  }).on("error", (err) => {
    res.end("EN");
  });
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
  config = JSON.parse(
    await fsAsync.readFile("./dist/config.json", "utf8"),
  );

  countries = JSON.parse(
    await fsAsync.readFile("./dist/data/countries.json", "utf8"),
  );

  http.createServer(app).listen(config.port, () => {
    console.log("listening at", config.port);
  });
})();
