/**
 * This file was created because typescript needs a new file because
 * imports are buggy and I can't import from the other file
 * @module
 */

import equals from "deep-equal";

/**
 * Compares renderer args
 * @param a 
 * @param b 
 * @returns 
 */
export function shallowDeepRendererArgsComparer(a: any, b: any) {
    if (a === b) {
      return true;
    }
  
    const hasAllAKeys = Object.keys(a).every((k) => {
      return typeof b[k] !== "undefined";
    });
  
    if (!hasAllAKeys) {
      return false;
    }
  
    const hasAllBKeys = Object.keys(b).every((k) => {
      return typeof a[k] !== "undefined";
    });
  
    if (!hasAllBKeys) {
      return false;
    }
  
    return Object.keys(a).every((k) => {
      if (a[k].$$typeof) {
        return a[k] === b[k];
      }
  
      return equals(a[k], b[k], {strict: true});
    });
  }