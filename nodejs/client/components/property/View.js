"use strict";
/**
 * Contains the view component that pipes the data to the all mighty function
 * in base.tsx
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/**
 * Creates an view for a given property id
 *
 * The viewer can be used with meta properties, such as created_at edited_at, etc...
 *
 * @param props the props for the view
 * @returns a react component
 */
function View(props) {
    return base_1.EntryViewReadSet(props, "view");
}
exports.default = View;
