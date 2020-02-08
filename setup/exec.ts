import { spawn } from "child_process";
import sudo from "sudo-prompt";

export function execAsync(code: string) {
  return new Promise((resolve, reject) => {
    const codeArray = code.split(/\s+/g);
    const program = codeArray.shift();
    const spawnable = spawn(program, codeArray);
    spawnable.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    spawnable.stderr.on("data", (data) => {
      console.log(data.toString());
    });
    spawnable.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error("Failed with status code " + code));
      } else {
        resolve();
      }
    });
    spawnable.on("error", (err) => {
      reject(err);
    });
  });
}

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