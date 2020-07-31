/**
 * Contains the fast prototyping collector for collection usage
 * in SSR
 * 
 * @packageDocumentation
 */

import React from "react";
import uuid from "uuid";
import { ServerStyleSheets } from "./mui-core";
import { ICollectorType } from "../../client";

/**
 * Temporarily stores the result of the collection
 */
const STYLE_COLLECTION = {};

/**
 * This collector is a valid collector type for usage with the
 * style collector for the initialization of the app in the server side
 */
export const styleCollector: ICollectorType = {
  /**
   * the collection function
   * @param app the itemize app
   */
  collect(app: React.ReactElement) {
    const id = uuid.v4();
    const sheets = new ServerStyleSheets();
    STYLE_COLLECTION[id] = sheets;

    // returns the resulting node to use and the
    // id where it is supposed to be collected
    return {
      node: sheets.collect(app),
      id,
    }
  },

  /**
   * retrieves the styles
   * @param id the id that is expecting to retrieve
   * @returns a string with the #ssr-sheets value
   */
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