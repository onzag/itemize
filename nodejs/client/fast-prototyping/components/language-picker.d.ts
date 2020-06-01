import React from "react";
interface ILanguagePickerProps {
    className?: string;
    useCode?: boolean;
    shrinkingDisplay?: boolean;
    shrinkingDisplayStandardClassName?: string;
    shrinkingDisplayShrunkClassName?: string;
}
interface ILanguagePickerState {
    anchorEl: HTMLElement;
}
export declare class LanguagePicker extends React.Component<ILanguagePickerProps, ILanguagePickerState> {
    constructor(props: ILanguagePickerProps);
    handleButtonSelectClick(e: React.MouseEvent<HTMLButtonElement>): void;
    handleMenuClose(): void;
    handleLanguageChange(changeLanguageToFn: (code: string) => void, code: string): void;
    render(): JSX.Element;
}
export {};
