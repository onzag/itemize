import { IRendererContext } from "../../providers/renderer";
import PropertyEntryFieldRenderer from "./PropertyEntry/PropertyEntryField";

const rendererContext: IRendererContext = {
  PropertyEntryField: PropertyEntryFieldRenderer,
}

export default rendererContext;