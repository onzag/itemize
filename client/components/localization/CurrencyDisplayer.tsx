import { useI18nRead } from "./I18nRead";
import { currencies } from "../../../imported-resources";
import React from "react";

interface ICurrencyDisplayerProps {
  currency: string;
  value: number | string;
  useCode?: boolean;
  /**
   * Will provide a React.ReactNode instead of a string when useCode is not true
   * because it will return the currency as a span with an aria-label
   */
  makeAccessible?: boolean;
}

export function useCurrencyDisplayer(options: ICurrencyDisplayerProps): string | React.ReactNode {
  const formatter = useCurrencyDisplayerFormatter();

  return formatter(options);
}

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
}

type Formatter = (options: ICurrencyDisplayerProps) => string | React.ReactNode;

export function useCurrencyDisplayerFormatter(): Formatter {
  const format = useI18nRead({ i18nId: "currency_format" });

  return (options: ICurrencyDisplayerProps) => {
    const currencyType = currencies[options.currency];
    let symbolToUse = currencyType ? currencyType.symbol : options.currency;
    if (options.useCode) {
      symbolToUse = options.currency;
    }
    if (options.makeAccessible && !options.useCode) {
      if (format === "$N") {
        return (
          <>
            <span aria-hidden="true">{symbolToUse}</span>
            {options.value}
            <span style={visuallyHidden as any}>{currencyType?.name || options.currency}</span>
          </>
        );
      } else {
        return (
          <>
            {options.value}
            <span style={visuallyHidden as any}>{currencyType?.name || options.currency}</span>
            <span aria-hidden="true">{symbolToUse}</span>
          </>
        );
      }
    }
    if (format === "$N") {
      return symbolToUse + options.value;
    } else {
      return options.value + symbolToUse;
    }
  }
}

export default function CurrencyDisplayer(props: ICurrencyDisplayerProps): any {
  return useCurrencyDisplayer(props);
}