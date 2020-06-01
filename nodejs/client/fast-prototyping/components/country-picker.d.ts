import React from "react";
interface ICountryPickerProps {
    className?: string;
    useCode?: boolean;
}
interface ICountryPickerState {
    anchorEl: HTMLElement;
}
export declare class CountryPicker extends React.Component<ICountryPickerProps, ICountryPickerState> {
    constructor(props: ICountryPickerProps);
    handleButtonSelectClick(e: React.MouseEvent<HTMLButtonElement>): void;
    handleMenuClose(): void;
    handleCountryChange(changeCountryToFn: (code: string) => void, code: string): void;
    render(): JSX.Element;
}
export {};
