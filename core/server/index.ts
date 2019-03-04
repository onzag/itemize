import * as express from "express";
import * as http from "http";
import * as fs from "fs";
const fsAsync = fs.promises;

const app = express();
(async () => {
    const config: any = await fsAsync.readFile("./dist/config.json", "utf8");

    app.get("/", (req, res) => {
        res.sendFile("./dist/data/index.html");
    });

    http.createServer(app).listen(config.port, () => {
        console.log("listening at", config.port);
    });
})();
