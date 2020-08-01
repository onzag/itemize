/**
 * Utility to execute commands in sh, even in sudo mode
 * @packageDocumentation
 */

import { spawn } from "child_process";
import sudo from "sudo-prompt";

/**
 * Simply does an exec
 * @param code the code we execute
 * @returns a void promise
 */
export function execAsync(code: string) {
  // this is the promise
  return new Promise((resolve, reject) => {
    // we need to rid of spaces
    const codeArray = code.split(/\s+/g);
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

/**
 * Does the same as execAsync but with sudo provileges
 * @param code the code to execute
 * @param name the name we are giving this application
 * @param icns
 * @returns a void promise
 */
export function execSudo(code: string, name: string, icns?: string) {
  return new Promise((resolve, reject) => {
    sudo.exec(
      code,
      {
        name,
        icns,
      },
      (
        error,
        stdout,
        stderr,
      ) => {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr)
        }
        if (error) {
          reject(error)
        } else {
          resolve();
        }
      }
    );
  });
}
