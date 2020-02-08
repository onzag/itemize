import { exec } from "child_process";
import colors from "colors";
import { ISetupConfigType } from "..";

export default function dockerSetup(arg: ISetupConfigType): Promise<ISetupConfigType> {
  // so we return a promise
  return new Promise((resolve, reject) => {
    // by checking for docker with the version
    console.log(colors.yellow("Checking for docker"));

    // execute the command
    exec("docker --version", (error, stdout, stderr) => {
      // log stdout and stderr if available
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
      if (error) {
        console.log(
          colors.red("Docker not found, please visit ") +
          colors.green("https://docs.docker.com/install/") +
          " for instructions",
        );
        reject(error);
      } else {
        resolve(arg);
      }
    });
  });
}
