/**
 * Contains the fast prototyping collector for collection usage
 * in SSR
 * 
 * @module
 */
import React from "react";
import uuid from "uuid";
import { ICollectorType } from "../../client";
import { ReuseCacheContextEmotionIsAMess, createEmotionCache } from "./wrappers";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from '@emotion/server/create-instance';

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
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
    STYLE_COLLECTION[id] = {
      extractCriticalToChunks,
      constructStyleTagsFromChunks,
    };

    // returns the resulting node to use and the
    // id where it is supposed to be collected
    return {
      node: (
        <ReuseCacheContextEmotionIsAMess.Provider value={true}>
          <CacheProvider value={cache}>
            {app}
          </CacheProvider>
        </ReuseCacheContextEmotionIsAMess.Provider>
      ),
      id,
    }
  },

  /**
   * retrieves the styles
   * @param id the id that is expecting to retrieve
   * @returns a string with the #ssr-sheets value
   */
  retrieve(id: string, html: string) {
    const sheetsObj = STYLE_COLLECTION[id];
    if (!sheetsObj) {
      return "";
    }

    const emotionChunks = sheetsObj.extractCriticalToChunks(html);
    const emotionCss = sheetsObj.constructStyleTagsFromChunks(emotionChunks);

    const value = emotionCss;

    delete STYLE_COLLECTION[id];
    return value;
  }
}