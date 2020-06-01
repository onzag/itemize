/// <reference types="react" />
import { IPropertyViewProps } from "./base";
import { IPropertyViewRendererProps } from "../../internal/components/PropertyView";
import { PropertyDefinitionSupportedBooleanType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
export default function View(props: IPropertyViewProps<IPropertyViewRendererProps<PropertyDefinitionSupportedBooleanType>>): JSX.Element;
