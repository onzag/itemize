import React from "react";
interface ICurrencyPickerProps {
    className?: string;
    useCode?: boolean;
}
interface ICurrencyPickerState {
    anchorEl: HTMLElement;
}
export declare class CurrencyPicker extends React.Component<ICurrencyPickerProps, ICurrencyPickerState> {
    constructor(props: ICurrencyPickerProps);
    handleButtonSelectClick(e: React.MouseEvent<HTMLButtonElement>): void;
    handleMenuClose(): void;
    handleCurrencyChange(changeCurrencyToFn: (code: string) => void, code: string): void;
    render(): JSX.Element;
}
export {};
