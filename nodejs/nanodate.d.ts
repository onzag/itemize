/**
 * Contains the nanodate class in it
 * @packageDocumentation
 */
/**
 * The nanosecond composed date allows to parse nanosecond ISO dates and keep and mantain their precision
 * this class is useful for handling postgresql dates, in the case of itemize, created_at, edited_at are given
 * with nanodate level precision so if fine adjustment is needed please use this class instead of Date
 */
export declare class NanoSecondComposedDate {
    /**
     * The original date
     */
    date: Date;
    /**
     * The original string
     */
    original: string;
    /**
     * The remainder numeric value, this is the number
     * left after the first 3 numbers after the decimal in seconds
     */
    remainder: number;
    /**
     * the millisecond time
     */
    time: number;
    /**
     * Build a new nanodate
     * @param str the ISO date
     */
    constructor(str: string);
    /**
     * Checks whether a given nano date is greater than another
     * @param otherDate the other date
     * @returns a boolean
     */
    greaterThan(otherDate: NanoSecondComposedDate): boolean;
    /**
     * Checks whether a given nano date is greater than or equal
     * @param otherDate the other date to check
     * @returns a boolean
     */
    greaterThanEqual(otherDate: NanoSecondComposedDate): boolean;
    /**
     * Checks whether a given nano date is less than
     * @param otherDate the other date to check
     * @returns a boolean
     */
    lessThan(otherDate: NanoSecondComposedDate): boolean;
    /**
     * Checks whether a given nano date is less than or equal
     * @param otherDate the other date to check
     * @returns a boolean
     */
    lessThanEqual(otherDate: NanoSecondComposedDate): boolean;
    /**
     * Checks whether a given nano date is equal to another
     * @param otherDate the other date to check
     * @returns a boolean
     */
    equal(otherDate: NanoSecondComposedDate): boolean;
    /**
     * Checks whether two given nano dates are not equal
     * @param otherDate the other date to check
     * @returns a boolean
     */
    notEqual(otherDate: NanoSecondComposedDate): boolean;
}
