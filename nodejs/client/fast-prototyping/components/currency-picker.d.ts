/**
 * Contains the currency picker fast prototyping element which allows the user
 * to select a currency
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The currency picker props
 */
interface ICurrencyPickerProps {
    /**
     * The class name for the currency picker
     */
    className?: string;
    /**
     * Whether to use the code and only the code rather the normal
     * combination of the code and the symbol
     */
    useCode?: boolean;
    /**
     * handle the currency change yourself rather than the default
     * which changes the application currency, this allows
     * you to control custom properties using Setters
     */
    handleCurrencyChange?: (code: string, appChangeCurrencyTo: (code: string) => void) => void;
    /**
     * handle the current code yourself rather than using the application's
     * default
     */
    currentCode?: string;
}
/**
 * The currency picker state
 */
interface ICurrencyPickerState {
    anchorEl: HTMLElement;
}
/**
 * Contains the currency picker fast prototyping element which allows the user
 * to select a currency
 *
 * Similarly to the country picker the currency picker can be rather heavy
 */
export declare class CurrencyPicker extends React.Component<ICurrencyPickerProps, ICurrencyPickerState> {
    constructor(props: ICurrencyPickerProps);
    handleButtonSelectClick(e: React.MouseEvent<HTMLButtonElement>): void;
    handleMenuClose(): void;
    handleCurrencyChange(changeCurrencyToFn: (code: string) => void, code: string): void;
    render(): JSX.Element;
}
export {};
