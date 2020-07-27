"use strict";
/**
 * Contains the very important error type and file
 * which specifies a pattern that is to be used in order
 * to send errors from the server side to the client side
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An instance version of the error that contains
 * the raw object data of the error
 */
class EndpointError extends Error {
    constructor(data) {
        super(data.message);
        this.data = data;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, EndpointError.prototype);
    }
}
exports.EndpointError = EndpointError;
