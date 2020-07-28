"use strict";
/**
 * Contains the reader component that pipes the data to the all mighty function
 * in base.tsx
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/**
 * Creates an reader for a given property id
 *
 * The reader can be used with meta properties, such as created_at edited_at, etc...
 *
 * @param props the props for the reader
 * @returns a react component
 */
function Reader(props) {
    return base_1.EntryViewReadSet(props, "read");
}
exports.default = Reader;
