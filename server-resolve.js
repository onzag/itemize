// used in replacement of tsconfig-resolve paths
// simpler and clearer just to resolve the paths used in the tsconfig
// without having to have supplied a tsconfig

const replacers = {
  "@onzag/itemize-text-engine": "@onzag/itemize-text-engine/nodejs",
  "@onzag/itemize": "@onzag/itemize/nodejs",
};

const replacersKeys = Object.keys(replacers);

const Module = require("module");
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, _parent) {
  for (let key of replacersKeys) {
    if (request.startsWith(key)) {
      const replaced = request.replace(key, replacers[key]);
      const modifiedArguments = [replaced, ...[].slice.call(arguments, 1)];
      return originalResolveFilename.apply(this, modifiedArguments);  
    }
  }
  return originalResolveFilename.apply(this, arguments);
};