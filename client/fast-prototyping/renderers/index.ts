import { IRendererContext } from "../../providers/renderer";
import PropertyEntryFieldRenderer from "./PropertyEntry/PropertyEntryField";
import PropertyEntryFileRenderer from "./PropertyEntry/PropertyEntryFile";
import PropertyEntryBooleanRenderer from "./PropertyEntry/PropertyEntryBoolean";
import PropertyEntryLocationRenderer from "./PropertyEntry/PropertyEntryLocation";
import PropertyEntrySelectRenderer from "./PropertyEntry/PropertyEntrySelect";
import PropertyEntryTextRenderer from "./PropertyEntry/PropertyEntryText";
import PropertyEntryDateTimeRenderer from "./PropertyEntry/PropertyEntryDateTime";

import PropertyViewBooleanRenderer from "./PropertyView/PropertyViewBoolean";
import PropertyViewSimpleRenderer from "./PropertyView/PropertyViewSimple";
import PropertyViewTextRenderer from "./PropertyView/PropertyViewText";
import PropertyViewFileRenderer from "./PropertyView/PropertyViewFile";
import PropertyViewDateTimeRenderer from "./PropertyView/PropertyViewDateTime";
import PropertyViewLocationRenderer from "./PropertyView/PropertyViewLocation";
import PropertyViewCurrencyRenderer from "./PropertyView/PropertyViewCurrency";

export const rendererContext: IRendererContext = {
  PropertyEntryField: PropertyEntryFieldRenderer,
  PropertyEntryFile: PropertyEntryFileRenderer,
  PropertyEntryBoolean: PropertyEntryBooleanRenderer,
  PropertyEntryLocation: PropertyEntryLocationRenderer, 
  PropertyEntrySelect: PropertyEntrySelectRenderer,
  PropertyEntryText: PropertyEntryTextRenderer,
  PropertyEntryDateTime: PropertyEntryDateTimeRenderer,

  PropertyViewBoolean: PropertyViewBooleanRenderer,
  PropertyViewSimple: PropertyViewSimpleRenderer,
  PropertyViewText: PropertyViewTextRenderer,
  PropertyViewDateTime: PropertyViewDateTimeRenderer,
  PropertyViewFile: PropertyViewFileRenderer,
  PropertyViewLocation: PropertyViewLocationRenderer,
  PropertyViewCurrency: PropertyViewCurrencyRenderer,
}
