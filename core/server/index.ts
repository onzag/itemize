import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
const fsAsync = fs.promises;

const app = express();
let config: any = null;
let countries: any = null;
let index: string = null;

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

app.get("/util/country", (req, res) => {
  // Only occurs during development
  res.setHeader("content-type", "application/json; charset=utf-8");

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
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(index);
});

(async () => {
  [config, countries, index] = await Promise.all([
    fsAsync.readFile("./dist/config.json", "utf8"),
    fsAsync.readFile("./dist/data/countries.json", "utf8"),
    fsAsync.readFile("./dist/data/index.html", "utf8"),
  ]);
  config = JSON.parse(config);
  countries = JSON.parse(countries);

  http.createServer(app).listen(config.port, () => {
    console.log("listening at", config.port);
  });
})();
