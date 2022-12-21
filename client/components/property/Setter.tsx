/**
 * Contains the setter component that pipes the data to the all mighty function
 * in base.tsx
 * 
 * @module
 */

import { IPropertySetterProps, EntryViewReadSet } from "./base";
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
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

/**
 * Allows to set the value for a property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * BooleanSetter
 * StringSetter
 * IntegerSetter
 * NumberSetter
 * CurrencySetter
 * UnitSetter
 * TextSetter
 * YearSetter
 * DateSetter
 * DatetimeSetter
 * PaymentSetter
 * TaglistSetter
 * FileSetter
 * FilesSetter
 * LocationSetter
 * TimeSetter
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export default function Setter(props: IPropertySetterProps<PropertyDefinitionSupportedType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a boolean property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function BooleanSetter(props: IPropertySetterProps<PropertyDefinitionSupportedBooleanType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a string property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function StringSetter(props: IPropertySetterProps<PropertyDefinitionSupportedStringType>) {
  return EntryViewReadSet(props, "set") as any;
}


/**
 * Allows to set the value for a ???? property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function IntegerSetter(props: IPropertySetterProps<PropertyDefinitionSupportedIntegerType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a ???? property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function NumberSetter(props: IPropertySetterProps<PropertyDefinitionSupportedNumberType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a currency property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function CurrencySetter(props: IPropertySetterProps<IPropertyDefinitionSupportedCurrencyType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a unit property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function UnitSetter(props: IPropertySetterProps<IPropertyDefinitionSupportedUnitType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a text property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function TextSetter(props: IPropertySetterProps<IPropertyDefinitionSupportedTextType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a year property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function YearSetter(props: IPropertySetterProps<PropertyDefinitionSupportedYearType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a date property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function DateSetter(props: IPropertySetterProps<PropertyDefinitionSupportedDateType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a date time property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function DateTimeSetter(props: IPropertySetterProps<PropertyDefinitionSupportedDateTimeType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a payment property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function PaymentSetter(props: IPropertySetterProps<IPropertyDefinitionSupportedPaymentType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a taglist property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function TagListSetter(props: IPropertySetterProps<PropertyDefinitionSupportedTagListType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a file property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function FileSetter(props: IPropertySetterProps<PropertyDefinitionSupportedFileType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a files array property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function FilesSetter(props: IPropertySetterProps<PropertyDefinitionSupportedFilesType>) {
  return EntryViewReadSet(props, "set") as any;
}

/**
 * Allows to set the value for a time property using components, this property
 * will then be marked as super enforced into this value and cannot really
 * be modified until the setter is unmounted
 * 
 * Note that for usage with automatic search, you should use the setter functionality
 * provided within the item definition provider search function as automatic search triggers before
 * the elements inside it mount, making this setter not execute but after automatic search is executed
 * 
 * @param props the props for the entry
 * @returns a react component
 */
export function TimeSetter(props: IPropertySetterProps<PropertyDefinitionSupportedTimeType>) {
  return EntryViewReadSet(props, "set") as any;
}
