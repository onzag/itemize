/// <reference types="react" />
import { IPropertyEntryProps } from "./base";
import { IPropertyEntryRendererProps } from "../../internal/components/PropertyEntry";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
export default function Entry(props: IPropertyEntryProps<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>): JSX.Element;
