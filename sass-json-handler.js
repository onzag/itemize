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
      if (filename.endsWith(".scss") || filename.endsWith(".sass") || filename.endsWith(".css") || filename.endsWith(".json")) {
        console.log("outputting", outFilePath);
        if (filename.endsWith(".json")) {
          const content = fs.readFileSync(filepath, "utf-8");
          fs.writeFile(outFilePath, content, () => {});
        } else {
          fs.writeFile(outFilePath, "", () => {});
        }
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

// corruption that occurs during the npm install process with forgets these files
walkDirectory("imported-resources", path.join("nodejs", "imported-resources"));
walkDirectory("client", path.join("nodejs", "client"));