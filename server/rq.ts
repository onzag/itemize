import { Router } from "express";
import type { RQRootSchema } from "../base/Root/rq";

export function rqSystem(options: {
  maxFileSize: number;
  maxFiles: number;
  maxFieldSize: number;
  jsonSchema: RQRootSchema;
  schema: RQRootSchema;
}) {
  const stringified = JSON.stringify(options.jsonSchema, null, 2);
  const router = Router();
  router.get("/", (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.status(200);
    res.end(stringified);
  });
  // // TODO
  // router.post("/", (req, res) => {
    
  // });
  return router;
}