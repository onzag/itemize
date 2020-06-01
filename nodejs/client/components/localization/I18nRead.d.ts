import React from "react";
import { ILocaleContextType } from "../../internal/app";
import { IItemDefinitionContextType } from "../../providers/item-definition";
import { IIncludeContext } from "../../providers/include";
import { IModuleContextType } from "../../providers/module";
export interface II18nReadProps {
    id: string;
    propertyId?: string;
    policyType?: string;
    policyName?: string;
    args?: any[];
    html?: boolean;
    htmlWrappingTag?: string;
    children?: (value: React.ReactNode) => React.ReactNode;
    capitalize?: boolean;
}
export declare function i18nReadInternal(localeContext: ILocaleContextType, moduleContextualValue: IModuleContextType, itemDefinitionContextualValue: IItemDefinitionContextType, includeContext: IIncludeContext, props: II18nReadProps): React.ReactNode;
export default function I18nRead(props: II18nReadProps): JSX.Element;
