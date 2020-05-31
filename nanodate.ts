const NanoSecondComposedDatePrecision = 6; // +3 of the millisecond precision makes a 9
export class NanoSecondComposedDate {
  public date: Date;
  public original: string;
  public remainder: number;
  public time: number;
  constructor(str: string) {
    this.original = str;
    this.date = new Date(str);
    this.time = this.date.getTime();
    let strRemainder = str.split("+")[0].split(".")[1].substr(3);
    // now we need to rightpad
    if (strRemainder.length > NanoSecondComposedDatePrecision) {
      strRemainder = strRemainder.substr(0, NanoSecondComposedDatePrecision);
    }
    strRemainder = strRemainder.padEnd(NanoSecondComposedDatePrecision, "0")
    this.remainder = parseInt(strRemainder) || 0;
  }
  public greaterThan(otherDate: NanoSecondComposedDate) {
    if (this.time > otherDate.time) {
      return true;
    } else if (this.time === otherDate.time) {
      // Need more precision
      return this.remainder > otherDate.remainder;
    } else {
      return false;
    }
  }
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
  public equal(otherDate: NanoSecondComposedDate) {
    return this.time === otherDate.time && this.remainder === otherDate.remainder;
  }
  public notEqual(otherDate: NanoSecondComposedDate) {
    return !this.equal(otherDate);
  }
}