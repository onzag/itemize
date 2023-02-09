/**
 * Contains the property view currency renderer
 * 
 * @module
 */

import { IPropertyViewPaymentRendererProps } from "../../../internal/components/PropertyView/PropertyViewPayment";
import React from "react";
import PropertyViewCurrencyRenderer from "./PropertyViewCurrency";
import PropertyViewSimpleRenderer from "./PropertyViewSimple";

/**
 * The property view for payment itself
 * works by sending them to other renderers that may do a better
 * job at rendering the value
 * 
 * supported args:
 *   render: "amount" | "type" | "status"
 * 
 *   amount uses the currency renderer
 *   type uses the simple renderer
 *   status uses the simple renderer
 * 
 * the remaining args will be passed to the precise renderer
 * 
 * @param props the props passed by the handler
 * @returns a react element
 */
export default function PropertyViewPaymentRenderer(props: IPropertyViewPaymentRendererProps) {
  if (props.args.render === "amount" || !props.args.render) {
    return (
      <PropertyViewCurrencyRenderer
        {...props}
        format={props.currencyFormat}
        currentValue={!props.currentValue ? null : {currency: props.currentValue.currency, value: props.currentValue.amount}}
      />
    )
  } else if (props.args.render === "type") {
    return (
      <PropertyViewSimpleRenderer
        {...props}
        capitalize={false}
        isRichText={false}
        language={null}
        currentValue={props.currentTypeStrValue}
      />
    )
  } else if (props.args.render === "status") {
    return (
      <PropertyViewSimpleRenderer
        {...props}
        capitalize={false}
        isRichText={false}
        language={null}
        currentValue={props.currentStatusStrValue}
      />
    )
  }
}
