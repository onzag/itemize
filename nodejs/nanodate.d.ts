export declare class NanoSecondComposedDate {
    date: Date;
    original: string;
    remainder: number;
    time: number;
    constructor(str: string);
    greaterThan(otherDate: NanoSecondComposedDate): boolean;
    greaterThanEqual(otherDate: NanoSecondComposedDate): boolean;
    lessThan(otherDate: NanoSecondComposedDate): boolean;
    lessThanEqual(otherDate: NanoSecondComposedDate): boolean;
    equal(otherDate: NanoSecondComposedDate): boolean;
    notEqual(otherDate: NanoSecondComposedDate): boolean;
}
