"use strict";
/**
 * Contains the entry component that pipes the data to the all mighty function
 * in base.tsx
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/**
 * Creates an entry for a given property id
 * @param props the props for the entry
 * @returns a react component
 */
function Entry(props) {
    return base_1.EntryViewReadSet(props, "entry");
}
exports.default = Entry;
