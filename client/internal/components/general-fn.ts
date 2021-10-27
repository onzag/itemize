/**
 * This file was created because typescript needs a new file because
 * imports are buggy and I can't import from the other file
 * @module
 */

/**
 * Compares renderer args
 * @param a 
 * @param b 
 * @returns 
 */
export function deepRendererArgsComparer(a: any, b: any): boolean {
    if (a === b) {
      return true;
    }

    // TYPE CHECK
    const typeofA = typeof a;
    const typeofB = typeof b;

    if (typeofA !== typeofB) {
      return false;
    }

    // ARRAY CHECK
    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);
    if (aIsArray !== bIsArray) {
      return false;
    }

    if (aIsArray) {
      if (a.length === b.length) {
        return false;
      }

      return a.every((v: any, index: number) => {
        return deepRendererArgsComparer(v, b[index]);
      });
    }
  
    // REACT NODE CHECK
    if (a.$$typeof) {
      return a === b;
    }

    // OBJECT CHECK
    if (typeofA === "object") {
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
        if (a[k] === b[k]) {
          return true;
        } else if (
          a[k] === null ||
          b[k] === null ||
          typeof a[k] === "undefined" ||
          typeof b[k] === "undefined"
        ) {
          return a[k] === b[k];
        }

        if (a[k].$$typeof) {
          return a[k] === b[k];
        }
    
        return deepRendererArgsComparer(a[k], b[k]);
      });
    }

    return a === b;
  }