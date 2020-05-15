import { IRendererContext } from "../../providers/renderer";
import PropertyEntryFieldRenderer from "./PropertyEntry/PropertyEntryField";
import PropertyEntryFileRenderer from "./PropertyEntry/PropertyEntryFile";
import PropertyEntryBooleanRenderer from "./PropertyEntry/PropertyEntryBoolean";
import PropertyEntryLocationRenderer from "./PropertyEntry/PropertyEntryLocation";
import PropertyEntrySelectRenderer from "./PropertyEntry/PropertyEntrySelect";
import PropertyEntryTextRenderer from "./PropertyEntry/PropertyEntryText";

import PropertyViewSimpleRenderer from "./PropertyView/PropertyViewSimple";
import PropertyViewTextRenderer from "./PropertyView/PropertyViewText";
import PropertyViewFileRenderer from "./PropertyView/PropertyViewFile";

export const rendererContext: IRendererContext = {
  PropertyEntryField: PropertyEntryFieldRenderer,
  PropertyEntryFile: PropertyEntryFileRenderer,
  PropertyEntryBoolean: PropertyEntryBooleanRenderer,
  PropertyEntryLocation: PropertyEntryLocationRenderer, 
  PropertyEntrySelect: PropertyEntrySelectRenderer,
  PropertyEntryText: PropertyEntryTextRenderer,

  PropertyViewSimple: PropertyViewSimpleRenderer,
  PropertyViewText: PropertyViewTextRenderer,
  PropertyViewFile: PropertyViewFileRenderer,
}
