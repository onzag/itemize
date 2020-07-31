/**
 * Provides a list of articles for the fast prototyping frontpage
 *
 * @packageDocumentation
 */
import React from "react";
import { Theme } from "../../mui-core";
/**
 * The list of articles styles
 * @param theme the mui theme
 * @returns a bunch of styles
 */
export declare const articlesStyles: (theme: Theme) => Record<"container" | "paper" | "newsTitle" | "articleContainer" | "articleImageContainer" | "articleImage" | "articleText" | "articleSummary" | "articleSummaryContainer" | "publisherInfoBox" | "publisherInfoDetailsBox" | "moreNewsContainer" | "moreNewsButton", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
/**
 * Provides a list of articles for fast prototyping that the user can interact with, this is meant
 * to be placed within the frontpage
 * @param props the article list props
 * @returns a react element
 */
export declare const Articles: React.ComponentType<Pick<{
    classes: Record<"container" | "paper" | "newsTitle" | "articleContainer" | "articleImageContainer" | "articleImage" | "articleText" | "articleSummary" | "articleSummaryContainer" | "publisherInfoBox" | "publisherInfoDetailsBox" | "moreNewsContainer" | "moreNewsButton", string>;
}, never> & import("@material-ui/styles").StyledComponentProps<"container" | "paper" | "newsTitle" | "articleContainer" | "articleImageContainer" | "articleImage" | "articleText" | "articleSummary" | "articleSummaryContainer" | "publisherInfoBox" | "publisherInfoDetailsBox" | "moreNewsContainer" | "moreNewsButton">>;
