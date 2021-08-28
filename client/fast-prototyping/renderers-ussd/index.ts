/**
 * This file represents the renderer context for the fast prototyping USSD mechanism
 * 
 * @module
 */

import { IRendererContext } from "../../providers/renderer";

export const rendererContext: IRendererContext = {
  PropertyEntryField: null,
  PropertyEntryReference: null,
  PropertyEntryFile: null,
  PropertyEntryBoolean: null,
  PropertyEntryLocation: null, 
  PropertyEntrySelect: null,
  PropertyEntryText: null,
  PropertyEntryDateTime: null,
  PropertyEntryPayment: null,

  PropertyViewBoolean: null,
  PropertyViewSimple: null,
  PropertyViewText: null,
  PropertyViewDateTime: null,
  PropertyViewFile: null,
  PropertyViewLocation: null,
  PropertyViewCurrency: null,
}
