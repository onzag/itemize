/**
 * Utility to execute commands in console
 * @module
 */

import { spawn } from "child_process";

/**
 * Split args in a lazy manner for the exec async
 * so that's more or less bash compatible
 * 
 * @param code 
 * @returns 
 */
function splitArgs(code: string): string[] {
  const codeArray = code.split(/\s+/g).filter((v) => v);
  const finalValue: string[] = [];
  let accum: string = "";
  let inJSONStr = false;
  codeArray.forEach((v) => {
    accum += " " + v;
    if (v.startsWith('"')) {
      inJSONStr = true;
    }
    
    if (v.endsWith('"') && inJSONStr) {
      inJSONStr = false;
      accum = JSON.parse(accum.trim());
    }
    
    if (!inJSONStr) {
      accum = accum.trim();
      finalValue.push(accum);
      accum = "";
    }
  });

  return finalValue;
}

/**
 * Simply does an exec
 * @param code the code we execute
 * @returns a void promise
 */
export function execAsync(code: string): Promise<void> {
  console.log(code);
  // this is the promise
  return new Promise((resolve, reject) => {
    // we need to rid of spaces
    const codeArray = splitArgs(code);
    // the program is the first arg
    const program = codeArray.shift();
    // and now we run spawn with each arg
    const spawnable = spawn(program, codeArray);
    // and log the data
    spawnable.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    // the errors
    spawnable.stderr.on("data", (data) => {
      console.log(data.toString());
    });
    // and the exit for resolving
    spawnable.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error("Failed with status code " + code));
      } else {
        resolve();
      }
    });
    // on error we reject
    spawnable.on("error", (err) => {
      reject(err);
    });
  });
}
