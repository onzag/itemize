import { IRendererContext } from "../../providers/renderer";
import PropertyEntryFieldRenderer from "./PropertyEntry/PropertyEntryField";
import PropertyEntryFileRenderer from "./PropertyEntry/PropertyEntryFile";
import PropertyEntryBooleanRenderer from "./PropertyEntry/PropertyEntryBoolean";
import PropertyEntryLocationRenderer from "./PropertyEntry/PropertyEntryLocation";

const rendererContext: IRendererContext = {
  PropertyEntryField: PropertyEntryFieldRenderer,
  PropertyEntryFile: PropertyEntryFileRenderer,
  PropertyEntryBoolean: PropertyEntryBooleanRenderer,
  PropertyEntryLocation: PropertyEntryLocationRenderer, 
}

export default rendererContext;