import { IRendererContext } from "../../providers/renderer";
import PropertyEntryFieldRenderer from "./PropertyEntry/PropertyEntryField";
import PropertyEntryFileRenderer from "./PropertyEntry/PropertyEntryFile";
import PropertyEntryBooleanRenderer from "./PropertyEntry/PropertyEntryBoolean";

const rendererContext: IRendererContext = {
  PropertyEntryField: PropertyEntryFieldRenderer,
  PropertyEntryFile: PropertyEntryFileRenderer,
  PropertyEntryBoolean: PropertyEntryBooleanRenderer,
}

export default rendererContext;