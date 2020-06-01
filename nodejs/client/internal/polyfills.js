"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/stable");
require("regenerator-runtime/runtime");
// this file exists only because due to many interactions the polyfills fail to load
// this only occurs during many chunks so this ensures that the chunk is globally executed
// only used for the main polyfill file, not used in workers that are a single self contained file
