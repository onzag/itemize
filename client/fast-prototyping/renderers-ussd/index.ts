/**
 * This file represents the renderer context for the fast prototyping USSD mechanism
 * 
 * @module
 */

import { IRendererContext } from "../../providers/renderer";
import PropertyViewBooleanRenderer from "../renderers/PropertyView/PropertyViewBoolean";
import PropertyViewDateTimeRenderer from "../renderers/PropertyView/PropertyViewDateTime";
import PropertyViewSimpleRenderer from "../renderers/PropertyView/PropertyViewSimple";
import PropertyViewTextRenderer from "../renderers/PropertyView/PropertyViewText";
import PropertyViewCurrencyUSSDRenderer from "./PropertyView/PropertyViewCurrency";
import PropertyViewFileUSSDRenderer from "./PropertyView/PropertyViewFile";
import PropertyViewLocationUSSDRenderer from "./PropertyView/PropertyViewLocation";

export const rendererContext: IRendererContext = {
  PropertyEntryField: null,
  PropertyEntryFile: null,
  PropertyEntryBoolean: null,
  PropertyEntryLocation: null, 
  PropertyEntrySelect: null,
  PropertyEntryText: null,
  PropertyEntryDateTime: null,
  PropertyEntryPayment: null,

  PropertyViewBoolean: PropertyViewBooleanRenderer,
  PropertyViewSimple: PropertyViewSimpleRenderer,
  PropertyViewText: PropertyViewTextRenderer,
  PropertyViewDateTime: PropertyViewDateTimeRenderer,
  PropertyViewFile: PropertyViewFileUSSDRenderer,
  PropertyViewLocation: PropertyViewLocationUSSDRenderer,
  PropertyViewCurrency: PropertyViewCurrencyUSSDRenderer,
}
