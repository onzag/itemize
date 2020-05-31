"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NanoSecondComposedDatePrecision = 6; // +3 of the millisecond precision makes a 9
class NanoSecondComposedDate {
    constructor(str) {
        this.original = str;
        this.date = new Date(str);
        this.time = this.date.getTime();
        let strRemainder = str.split("+")[0].split(".")[1].substr(3);
        // now we need to rightpad
        if (strRemainder.length > NanoSecondComposedDatePrecision) {
            strRemainder = strRemainder.substr(0, NanoSecondComposedDatePrecision);
        }
        strRemainder = strRemainder.padEnd(NanoSecondComposedDatePrecision, "0");
        this.remainder = parseInt(strRemainder) || 0;
    }
    greaterThan(otherDate) {
        if (this.time > otherDate.time) {
            return true;
        }
        else if (this.time === otherDate.time) {
            // Need more precision
            return this.remainder > otherDate.remainder;
        }
        else {
            return false;
        }
    }
    greaterThanEqual(otherDate) {
        if (this.time >= otherDate.time) {
            return true;
        }
        else if (this.time === otherDate.time) {
            // Need more precision
            return this.remainder >= otherDate.remainder;
        }
        else {
            return false;
        }
    }
    lessThan(otherDate) {
        if (this.time < otherDate.time) {
            return true;
        }
        else if (this.time === otherDate.time) {
            // Need more precision
            return this.remainder < otherDate.remainder;
        }
        else {
            return false;
        }
    }
    lessThanEqual(otherDate) {
        if (this.time < otherDate.time) {
            return true;
        }
        else if (this.time === otherDate.time) {
            // Need more precision
            return this.remainder <= otherDate.remainder;
        }
        else {
            return false;
        }
    }
    equal(otherDate) {
        return this.time === otherDate.time && this.remainder === otherDate.remainder;
    }
    notEqual(otherDate) {
        return !this.equal(otherDate);
    }
}
exports.NanoSecondComposedDate = NanoSecondComposedDate;
