/**
 * The language picker component allows the user to choose a language and update the app
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The props of the language picker, a bit different from other pickers
 */
interface ILanguagePickerProps {
    /**
     * The class name
     */
    className?: string;
    /**
     * Whether to use the code, rather than the name that it was given to them
     */
    useCode?: boolean;
    /**
     * whether to use a display that is able to shrink, one contains the
     * standard native name, and the other contains only the language code
     */
    shrinkingDisplay?: boolean;
    /**
     * This is the class name that contains the standard language native
     * name, it should be invisible when the shrunk is visible
     */
    shrinkingDisplayStandardClassName?: string;
    /**
     * This is the class name that contains the shrunk code only name,
     * it should be visible when the standard is visible
     */
    shrinkingDisplayShrunkClassName?: string;
}
/**
 * The language picker state
 */
interface ILanguagePickerState {
    anchorEl: HTMLElement;
}
/**
 * Allows the user to choose a language from the language list
 *
 * Because there aren't usually many languages this picker tends to be rather lightweight however
 * it still remains unmounted by default
 */
export declare class LanguagePicker extends React.Component<ILanguagePickerProps, ILanguagePickerState> {
    constructor(props: ILanguagePickerProps);
    handleButtonSelectClick(e: React.MouseEvent<HTMLButtonElement>): void;
    handleMenuClose(): void;
    handleLanguageChange(changeLanguageToFn: (code: string) => void, code: string): void;
    render(): JSX.Element;
}
export {};
