import React from "react";
import uuid from "uuid";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { ICollectorType } from "../../client";

const STYLE_COLLECTION = {};
export const styleCollector: ICollectorType = {
  collect(app: React.ReactElement) {
    const id = uuid.v4();
    const sheets = new ServerStyleSheets();
    STYLE_COLLECTION[id] = sheets;
    return {
      node: sheets.collect(app),
      id,
    }
  },
  retrieve(id: string) {
    const sheets: ServerStyleSheets = STYLE_COLLECTION[id];
    if (!sheets) {
      return "";
    }
    const value = '<style id="#ssr-sheets">' + sheets.toString() + '</style>';
    delete STYLE_COLLECTION[id];
    return value;
  }
}