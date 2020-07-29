/**
 * Contains a country picker that allows the user to fully select their own country
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The props of the countrypicker
 */
interface ICountryPickerProps {
    /**
     * A classname to wrap it on
     */
    className?: string;
    /**
     * Whether to use the country code rather than the native name
     */
    useCode?: boolean;
}
/**
 * The state of the countrypicker
 */
interface ICountryPickerState {
    anchorEl: HTMLElement;
}
/**
 * Contains a country picker that allows the user to fully select their own country
 *
 * Picking a country will affect language and currency
 *
 * This country picker is heavy stuff, despite it being a rather simple component
 * it has to render so many countries it can make the app slow
 *
 * For that reason it will not keep itself mounted as the generated tree can be rather large
 */
export declare class CountryPicker extends React.PureComponent<ICountryPickerProps, ICountryPickerState> {
    constructor(props: ICountryPickerProps);
    handleButtonSelectClick(e: React.MouseEvent<HTMLButtonElement>): void;
    handleMenuClose(): void;
    handleCountryChange(changeCountryToFn: (code: string) => void, code: string): void;
    render(): JSX.Element;
}
export {};
