/**
 * Contains the reader component that pipes the data to the all mighty function
 * in base.tsx
 * 
 * @module
 */

import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import type { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IPropertyReadProps, EntryViewReadSet, IPropertyReadPropsWOChildren, ReadSetterCallback } from "./base";
import { PropertyDefinitionSupportedStringType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/string";
import { PropertyDefinitionSupportedBooleanType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
import { PropertyDefinitionSupportedIntegerType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/integer";
import { PropertyDefinitionSupportedNumberType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/number";
import { IPropertyDefinitionSupportedCurrencyType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";
import { IPropertyDefinitionSupportedUnitType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/unit";
import { IPropertyDefinitionSupportedTextType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { PropertyDefinitionSupportedYearType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/year";
import { PropertyDefinitionSupportedDateType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/date";
import { PropertyDefinitionSupportedDateTimeType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/datetime";
import { IPropertyDefinitionSupportedPaymentType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/payment";
import { PropertyDefinitionSupportedTagListType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/taglist";
import { PropertyDefinitionSupportedFileType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/file";
import { PropertyDefinitionSupportedFilesType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { IPropertyDefinitionSupportedLocationType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { PropertyDefinitionSupportedTimeType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/time";

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
export default function Reader(props: IPropertyReadProps<PropertyDefinitionSupportedType>) {
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
export function useReader<T extends PropertyDefinitionSupportedType>(options: IPropertyReadPropsWOChildren) {
  return EntryViewReadSet(options as any, "read", true) as [T, IPropertyDefinitionState<T>, ReadSetterCallback<T>];
}

/**
 * Reads a boolean value using the reader mechanism
 * 
 * @param props the props for the reader
 * @returns 
 */
export function BooleanReader(props: IPropertyReadProps<PropertyDefinitionSupportedBooleanType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a boolean value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useBooleanReader(options: IPropertyReadPropsWOChildren | string) {
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
export function IntegerReader(props: IPropertyReadProps<PropertyDefinitionSupportedIntegerType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads an integer value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useIntegerReader(options: IPropertyReadPropsWOChildren | string) {
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
export function NumberReader(props: IPropertyReadProps<PropertyDefinitionSupportedNumberType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a numeric value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useNumberReader(options: IPropertyReadPropsWOChildren | string) {
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
export function CurrencyReader(props: IPropertyReadProps<IPropertyDefinitionSupportedCurrencyType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a currency value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useCurrencyReader(options: IPropertyReadPropsWOChildren | string) {
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
export function UnitReader(props: IPropertyReadProps<IPropertyDefinitionSupportedUnitType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a unit value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useUnitReader(options: IPropertyReadPropsWOChildren | string) {
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
export function StringReader(props: IPropertyReadProps<PropertyDefinitionSupportedStringType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a string value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useStringReader(options: IPropertyReadPropsWOChildren | string) {
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
export function TextReader(props: IPropertyReadProps<IPropertyDefinitionSupportedTextType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a textual value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useTextReader(options: IPropertyReadPropsWOChildren | string) {
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
export function YearReader(props: IPropertyReadProps<PropertyDefinitionSupportedYearType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a year value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useYearReader(options: IPropertyReadPropsWOChildren | string) {
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
export function DateReader(props: IPropertyReadProps<PropertyDefinitionSupportedDateType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a year value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useDateReader(options: IPropertyReadPropsWOChildren | string) {
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
export function TimeReader(props: IPropertyReadProps<PropertyDefinitionSupportedTimeType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a time value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useTimeReader(options: IPropertyReadPropsWOChildren | string) {
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
export function DatetimeReader(props: IPropertyReadProps<PropertyDefinitionSupportedDateTimeType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a timestamp value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useDatetimeReader(options: IPropertyReadPropsWOChildren | string) {
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
export function LocationReader(props: IPropertyReadProps<IPropertyDefinitionSupportedLocationType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a location coordinates value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useLocationReader(options: IPropertyReadPropsWOChildren | string) {
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
export function FileReader(props: IPropertyReadProps<PropertyDefinitionSupportedFileType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a file value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useFileReader(options: IPropertyReadPropsWOChildren | string) {
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
export function FilesReader(props: IPropertyReadProps<PropertyDefinitionSupportedFilesType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a files array value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useFilesReader(options: IPropertyReadPropsWOChildren | string) {
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
export function PaymentReader(props: IPropertyReadProps<IPropertyDefinitionSupportedPaymentType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a payment value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function usePaymentReader(options: IPropertyReadPropsWOChildren | string) {
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
export function TaglistReader(props: IPropertyReadProps<PropertyDefinitionSupportedTagListType>) {
  return EntryViewReadSet(props as any, "read");
}

/**
 * Reads a taglist (array of string)  value using the reader mechanism
 * 
 * @param options the options for the reader
 * @returns 
 */
export function useTaglistReader(options: IPropertyReadPropsWOChildren | string) {
  return EntryViewReadSet(options as any, "read", true) as
    [
      PropertyDefinitionSupportedTagListType,
      IPropertyDefinitionState<PropertyDefinitionSupportedTagListType>,
      ReadSetterCallback<PropertyDefinitionSupportedTagListType>,
    ];
}