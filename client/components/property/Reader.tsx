/**
 * Contains the reader component that pipes the data to the all mighty function
 * in base.tsx
 * 
 * @module
 */

import type { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import type { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IPropertyReadProps, EntryViewReadSet, IPropertyReadPropsWOChildren, ReadSetterCallback } from "./base";
import type { PropertyDefinitionSupportedStringType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/string";
import type { PropertyDefinitionSupportedBooleanType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
import type { PropertyDefinitionSupportedIntegerType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/integer";
import type { PropertyDefinitionSupportedNumberType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/number";
import type { IPropertyDefinitionSupportedCurrencyType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import type { IPropertyDefinitionSupportedUnitType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";
import type { IPropertyDefinitionSupportedTextType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import type { PropertyDefinitionSupportedYearType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/year";
import type { PropertyDefinitionSupportedDateType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/date";
import type { PropertyDefinitionSupportedDateTimeType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/datetime";
import type { IPropertyDefinitionSupportedPaymentType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/payment";
import type { PropertyDefinitionSupportedTagListType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/taglist";
import type { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import type { PropertyDefinitionSupportedFilesType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import type { IPropertyDefinitionSupportedLocationType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import type { PropertyDefinitionSupportedTimeType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/time";
import type { SearchVariants } from "../../../constants";

/**
 * Creates an reader for a given property id
 * 
 * The reader can be used with meta properties, such as created_at edited_at, etc...
 * 
 * use specific readers for specific actions, this is a generic reader
 * 
 * BooleanReader
 * IntegerReader
 * NumberReader
 * CurrencyReader
 * UnitReader
 * StringReader
 * TextReader
 * YearReader
 * DateReader
 * TimeReader
 * DatetimeReader
 * LocationReader
 * FileReader
 * FilesReader
 * PaymentReader
 * TaglistReader
 * 
 * @param props the props for the reader
 * @returns a react component
 */
export default function Reader(props: IPropertyReadProps<PropertyDefinitionSupportedType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Uses the generic reader to read the value of a property of a given id
 * 
 * use specific readers for specific actions, this is a generic reader
 * 
 * useBooleanReader
 * useIntegerReader
 * useNumberReader
 * useCurrencyReader
 * useUnitReader
 * useStringReader
 * usePasswordReader
 * useTextReader
 * useYearReader
 * useDateReader
 * useTimeReader
 * useDatetimeReader
 * useLocationReader
 * useFileReader
 * useFilesReader
 * usePaymentReader
 * useTaglistReader
 * 
 * @param options 
 * @returns 
 */
export function useReader<T extends PropertyDefinitionSupportedType>(options: IPropertyReadPropsWOChildren<string, SearchVariants>) {
  return EntryViewReadSet(options as any, "read", true) as [T, IPropertyDefinitionState<T>, ReadSetterCallback<T>];
}

/**
 * Reads a boolean value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function BooleanReader(props: IPropertyReadProps<PropertyDefinitionSupportedBooleanType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a boolean value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useBooleanReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedBooleanType,
      IPropertyDefinitionState<PropertyDefinitionSupportedBooleanType>,
      ReadSetterCallback<PropertyDefinitionSupportedBooleanType>,
    ];
}

/**
 * Reads an integer value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function IntegerReader(props: IPropertyReadProps<PropertyDefinitionSupportedIntegerType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads an integer value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useIntegerReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedIntegerType,
      IPropertyDefinitionState<PropertyDefinitionSupportedIntegerType>,
      ReadSetterCallback<PropertyDefinitionSupportedIntegerType>,
    ];
}

/**
 * Reads a numeric value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function NumberReader(props: IPropertyReadProps<PropertyDefinitionSupportedNumberType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a numeric value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useNumberReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedNumberType,
      IPropertyDefinitionState<PropertyDefinitionSupportedNumberType>,
      ReadSetterCallback<PropertyDefinitionSupportedNumberType>,
    ];
}

/**
 * Reads a currency value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function CurrencyReader(props: IPropertyReadProps<IPropertyDefinitionSupportedCurrencyType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a currency value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useCurrencyReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      IPropertyDefinitionSupportedCurrencyType,
      IPropertyDefinitionState<IPropertyDefinitionSupportedCurrencyType>,
      ReadSetterCallback<IPropertyDefinitionSupportedCurrencyType>,
    ];
}

/**
 * Reads a unit value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function UnitReader(props: IPropertyReadProps<IPropertyDefinitionSupportedUnitType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a unit value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useUnitReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      IPropertyDefinitionSupportedUnitType,
      IPropertyDefinitionState<IPropertyDefinitionSupportedUnitType>,
      ReadSetterCallback<IPropertyDefinitionSupportedUnitType>,
    ];
}

/**
 * Reads a string value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function StringReader(props: IPropertyReadProps<PropertyDefinitionSupportedStringType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a string value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useStringReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedStringType,
      IPropertyDefinitionState<PropertyDefinitionSupportedStringType>,
      ReadSetterCallback<PropertyDefinitionSupportedStringType>,
    ];
}

/**
 * Reads a textual value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function TextReader(props: IPropertyReadProps<IPropertyDefinitionSupportedTextType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a textual value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useTextReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
  [
    IPropertyDefinitionSupportedTextType,
    IPropertyDefinitionState<IPropertyDefinitionSupportedTextType>,
    ReadSetterCallback<IPropertyDefinitionSupportedTextType>,
  ];
}

/**
 * Reads a year value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function YearReader(props: IPropertyReadProps<PropertyDefinitionSupportedYearType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a year value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useYearReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedYearType,
      IPropertyDefinitionState<PropertyDefinitionSupportedYearType>,
      ReadSetterCallback<PropertyDefinitionSupportedYearType>,
    ];
}

/**
 * Reads a date value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function DateReader(props: IPropertyReadProps<PropertyDefinitionSupportedDateType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a year value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useDateReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as [
    PropertyDefinitionSupportedDateType,
    IPropertyDefinitionState<PropertyDefinitionSupportedDateType>,
    ReadSetterCallback<PropertyDefinitionSupportedDateType>,
  ];
}

/**
 * Reads a time value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function TimeReader(props: IPropertyReadProps<PropertyDefinitionSupportedTimeType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a time value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useTimeReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
  [
    PropertyDefinitionSupportedTimeType,
    IPropertyDefinitionState<PropertyDefinitionSupportedTimeType>,
    ReadSetterCallback<PropertyDefinitionSupportedTimeType>,
  ];
}

/**
 * Reads a timestamp value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function DatetimeReader(props: IPropertyReadProps<PropertyDefinitionSupportedDateTimeType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a timestamp value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useDatetimeReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedDateTimeType,
      IPropertyDefinitionState<PropertyDefinitionSupportedDateTimeType>,
      ReadSetterCallback<PropertyDefinitionSupportedDateTimeType>,
    ];
}

/**
 * Reads a location coordinates value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function LocationReader(props: IPropertyReadProps<IPropertyDefinitionSupportedLocationType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a location coordinates value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useLocationReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as [
    IPropertyDefinitionSupportedLocationType,
    IPropertyDefinitionState<IPropertyDefinitionSupportedLocationType>,
    ReadSetterCallback<IPropertyDefinitionSupportedLocationType>,
  ];
}

/**
 * Reads a file value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function FileReader(props: IPropertyReadProps<PropertyDefinitionSupportedFileType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a file value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useFileReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedFileType,
      IPropertyDefinitionState<PropertyDefinitionSupportedFileType>,
      ReadSetterCallback<PropertyDefinitionSupportedFileType>,
    ];
}

/**
 * Reads a files array value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function FilesReader(props: IPropertyReadProps<PropertyDefinitionSupportedFilesType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a files array value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useFilesReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedFilesType,
      IPropertyDefinitionState<PropertyDefinitionSupportedFilesType>,
      ReadSetterCallback<PropertyDefinitionSupportedFilesType>,
    ];
}

/**
 * Reads a payment value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function PaymentReader(props: IPropertyReadProps<IPropertyDefinitionSupportedPaymentType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a payment value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function usePaymentReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      IPropertyDefinitionSupportedPaymentType,
      IPropertyDefinitionState<IPropertyDefinitionSupportedPaymentType>,
      ReadSetterCallback<IPropertyDefinitionSupportedPaymentType>,
    ];
}

/**
 * Reads a taglist (array of string) value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function TaglistReader(props: IPropertyReadProps<PropertyDefinitionSupportedTagListType, string, SearchVariants>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a taglist (array of string)  value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useTaglistReader(options: IPropertyReadPropsWOChildren<string, SearchVariants> | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedTagListType,
      IPropertyDefinitionState<PropertyDefinitionSupportedTagListType>,
      ReadSetterCallback<PropertyDefinitionSupportedTagListType>,
    ];
}