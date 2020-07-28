"use strict";
/**
 * Contains the setter component that pipes the data to the all mighty function
 * in base.tsx
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/**
 * Allows to set the value for a property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 *
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 *
 * @param props the props for the entry
 * @returns a react component
 */
function Setter(props) {
    return base_1.EntryViewReadSet(props, "set");
}
exports.default = Setter;
