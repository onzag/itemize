import React from "react";
import { IPropertyEntryRendererProps, IPropertyEntryProps } from ".";
import { PropertyDefinitionSupportedBooleanType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean";
import equals from "deep-equal";

// function PropertyEntryBooleanAsSwitch(props: IPropertyEntryProps) {
//   // let's the get basic data for the entry
//   const i18nData = props.property.getI18nDataFor(props.language);
//   const i18nLabel = i18nData && i18nData.label;
//   const i18nDescription = i18nData && i18nData.description;
//   const iconComponent = props.icon ? (
//     <Icon classes={{root: props.classes.icon}}>{props.icon}</Icon>
//   ) : null;

//   // so now we build the initial container,
//   // add the description accordingly
//   // and build the field using form control
//   // that's basically the only way to do so
//   // because material ui really gets complicated
//   // for no reason at all
//   return (
//     <div className={props.classes.container}>
//       {i18nDescription ? <div
//         className={props.classes.description}
//       >
//         {i18nDescription}
//       </div> : null}
//       <FormControl className={props.classes.entry}>
//         <FormControlLabel
//           aria-label={i18nLabel}
//           classes={{
//             label: props.classes.label,
//           }}
//           control={
//             <Switch
//               checked={props.state.value as boolean || false}
//               onChange={props.onChange.bind(null, !props.state.value, null)}
//               disabled={props.state.enforced}
//             />
//           }
//           label={i18nLabel}
//         />
//         {iconComponent}
//       </FormControl>
//     </div>
//   );
// }

// /**
//  * Handles the onchange event of the property entry as radio
//  * as it is required that it passes a boolean or null
//  * @param props the properties of the field
//  * @param e the browser event
//  */


// function PropertyEntryBooleanAsRadio(props: IPropertyEntryProps) {
//   // Let's get the basic data
//   const i18nData = props.property.getI18nDataFor(props.language);
//   const i18nLabel = i18nData && i18nData.label;
//   const i18nDescription = i18nData && i18nData.description;
//   const icon = props.icon;
//   const iconComponent = icon ? (
//     <Icon classes={{root: props.classes.icon}}>{icon}</Icon>
//   ) : null;

//   // so the values are composed into, true, false and null
//   // because the value must be a string, we set it as a string
//   // then we use yes, no or unspecified as the definitions
//   

//   // this is the class that every radio select
//   // contains, because it contains a label we use
//   // a label class
//   const fclClasses = {
//     label: props.classes.label,
//   };

//   // now we create the class, just as before
//   // we use a fieldset as the component
//   // and we use the classname of the entry
//   // get the form label and build the radio group
//   return (
//     <div className={props.classes.container}>
//       
//     </div>
//   );
// }

// export class XXXX extends React.Component<IPropertyEntryProps, {}> {
//   public shouldComponentUpdate(nextProps: IPropertyEntryProps) {
//     return this.props.property !== nextProps.property ||
//       !equals(this.props.state, nextProps.state) ||
//       !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
//       !!this.props.poked !== !!nextProps.poked ||
//       nextProps.language !== this.props.language ||
//       nextProps.i18n !== this.props.i18n;
//   }
//   public render() {
//     // Booleans come in two types, one is the switch and the other
//     // is a radio, the switch works for basic true/false booleans
//     // whereas the radio works for true/false/null booleans
//     if (!this.props.property.isNullable()) {
//       return PropertyEntryBooleanAsSwitch(this.props);
//     }
//     return PropertyEntryBooleanAsRadio(this.props);
//   }
// }

export interface IPropertyEntryBooleanRendererProps extends IPropertyEntryRendererProps<PropertyDefinitionSupportedBooleanType> {
  isTernary: boolean;
  trueLabel?: string;
  falseLabel?: string;
  nullLabel?: string;
}

export default class PropertyEntryBoolean extends React.Component<
  IPropertyEntryProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>
> {
  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps<PropertyDefinitionSupportedBooleanType, IPropertyEntryBooleanRendererProps>,
  ) {
    return nextProps.property !== this.props.property ||
      !equals(this.props.state, nextProps.state) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.icon !== this.props.icon ||
      nextProps.renderer !== this.props.renderer ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
    const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || this.props.state.userSet) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const isTernary = this.props.property.isNullable();
    const trueLabel = this.props.i18n[this.props.language].yes;
    const falseLabel = this.props.i18n[this.props.language].no;
    const nullLabel = this.props.i18n[this.props.language].unspecified;

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryBooleanRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      isTernary,
      trueLabel,
      falseLabel,
      nullLabel,

      currentValue: this.props.state.value as boolean,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled: this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
    };

    return <RendererElement {...rendererArgs} />;
  }
}