/**
 * Contains the nanodate class in it
 * @module
 */

// the composed precision of the nanodate, basically how much more precision
// we need over millisecond precision
const NanoSecondComposedDatePrecision = 6; // +3 of the millisecond precision makes a 9 aka nanoseconds

/**
 * The nanosecond composed date allows to parse nanosecond ISO dates and keep and mantain their precision
 * this class is useful for handling postgresql dates, in the case of itemize, created_at, edited_at are given
 * with nanodate level precision so if fine adjustment is needed please use this class instead of Date
 */
export class NanoSecondComposedDate {
  /**
   * The original date
   */
  public date: Date;
  /**
   * The original string
   */
  public original: string;
  /**
   * The remainder numeric value, this is the number
   * left after the first 3 numbers after the decimal in seconds
   */
  public remainder: number;
  /**
   * the millisecond time
   */
  public time: number;

  /**
   * Build a new nanodate
   * @param str the ISO date
   */
  constructor(str: string) {
    // first we assign all these
    this.original = str;
    this.date = new Date(str);
    this.time = this.date.getTime();
    // now we need to remove timezone data, to the left, now we split
    // for the seconds section, and get the remainder; the date component
    // can parse the first 3 values, but not the remaining values
    let strRemainder: string;
    if (str) {
      if (str.endsWith("Z")) {
        const splitted = str.split("Z");
        strRemainder = splitted[0].split(".")[1].substr(3);
      } else {
        let splitted = str.split("+");
        if (splitted.length === 1) {
          splitted = str.split("-");
        }
        strRemainder = splitted[0].split(".")[1].substr(3);
      }
    } else {
      strRemainder = "";
    }


    // since we are using a total number, we need to ensure the size is exact
    // as our precision because we are parsing decimals
    if (strRemainder.length > NanoSecondComposedDatePrecision) {
      strRemainder = strRemainder.substr(0, NanoSecondComposedDatePrecision);
    }
    // and we pad
    strRemainder = strRemainder.padEnd(NanoSecondComposedDatePrecision, "0");
    // and this is our remainder, for the case of a 6 precision, as for nanoseconds
    // this is a number between 0 and 999999 so for a date with 12.345678 seconds
    // this value will be 678000
    this.remainder = parseInt(strRemainder) || 0;
  }

  /**
   * Tells wether the date is invalid
   * @returns 
   */
  public isInvalid() {
    return isNaN(this.time);
  }

  /**
   * Checks whether a given nano date is greater than another
   * @param otherDate the other date
   * @returns a boolean
   */
  public greaterThan(otherDate: NanoSecondComposedDate) {
    // first we check if the time itself is greater than the other
    if (this.time > otherDate.time) {
      return true;
      // otherwise if these dates are equal in milliseconds
    } else if (this.time === otherDate.time) {
      // We use the more precise remainder
      return this.remainder > otherDate.remainder;
    } else {
      // or return false
      return false;
    }
  }
  /**
   * Checks whether a given nano date is greater than or equal
   * @param otherDate the other date to check
   * @returns a boolean
   */
  public greaterThanEqual(otherDate: NanoSecondComposedDate) {
    if (this.time >= otherDate.time) {
      return true;
    } else if (this.time === otherDate.time) {
      // Need more precision
      return this.remainder >= otherDate.remainder;
    } else {
      return false;
    }
  }

  /**
   * Checks whether a given nano date is less than
   * @param otherDate the other date to check
   * @returns a boolean
   */
  public lessThan(otherDate: NanoSecondComposedDate) {
    if (this.time < otherDate.time) {
      return true;
    } else if (this.time === otherDate.time) {
      // Need more precision
      return this.remainder < otherDate.remainder;
    } else {
      return false;
    }
  }

  /**
   * Checks whether a given nano date is less than or equal
   * @param otherDate the other date to check
   * @returns a boolean
   */
  public lessThanEqual(otherDate: NanoSecondComposedDate) {
    if (this.time < otherDate.time) {
      return true;
    } else if (this.time === otherDate.time) {
      // Need more precision
      return this.remainder <= otherDate.remainder;
    } else {
      return false;
    }
  }

  /**
   * Checks whether a given nano date is equal to another
   * @param otherDate the other date to check
   * @returns a boolean
   */
  public equal(otherDate: NanoSecondComposedDate) {
    return this.time === otherDate.time && this.remainder === otherDate.remainder;
  }

  /**
   * Checks whether two given nano dates are not equal
   * @param otherDate the other date to check
   * @returns a boolean
   */
  public notEqual(otherDate: NanoSecondComposedDate) {
    return !this.equal(otherDate);
  }
}