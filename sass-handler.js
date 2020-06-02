// Due to the typescript compiler not copying scss files
// and making them empty files the output end up being bad

const fs = require("fs");
const path = require("path");

function walkDirectory(directory, targetDirectory) {
  fs.readdir(directory, (err, list) => {
    if (err) {
      throw err;
    }

    list.forEach((filename) => {
      const filepath = path.resolve(directory, filename);
      const outFilePath = path.resolve(targetDirectory, filename);
      if (filename.endsWith(".scss") || filename.endsWith(".sass") || filename.endsWith(".css")) {
        console.log("outputting", outFilePath);
        fs.writeFile(outFilePath, "", () => {});
      } else {
        fs.stat(filepath, (err, stat) => {
          if (stat && stat.isDirectory()) {
            fs.exists(outFilePath, (doesExist) => {
              if (!doesExist) {
                console.log("making", outFilePath);
                fs.mkdir(outFilePath, (err) => {
                  if (err) {
                    throw err;
                  }

                  walkDirectory(filepath, outFilePath);
                })
              } else {
                walkDirectory(filepath, outFilePath);
              }
            });
          }
        });
      }
    });
  });
}

walkDirectory("client", path.join("nodejs", "client"));