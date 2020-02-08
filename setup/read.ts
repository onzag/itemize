import read from "read";
import Confirm from "prompt-confirm";

export function request(options: read.Options): Promise<{
  result: string;
  isDefault: boolean;
}> {
  return new Promise((resolve, reject) => {
    read(options, (error, result, isDefault) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          result,
          isDefault,
        })
      }
    });
  });
}

export function confirm(question: string): Promise<boolean> {
  return (new Confirm(question)).run();
}