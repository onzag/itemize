// import React from "react";
// import { IIncludeExclusionSwitchProps } from ".";
// import { FormControlLabel, Switch, FormControl } from "@material-ui/core";
// import { IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";
// export default function StandardExclusionSwitch(props: IIncludeExclusionSwitchProps) {
//   // let's the get basic data for the entry
//   const i18nData = props.include.getI18nDataFor(props.locale.language);
//   const i18nLabel = i18nData && i18nData.exclusion_selector_label;
//   return (
//     <div className={props.classes.switchContainer}>
//       <FormControl className={props.classes.switchFormControl}>
//         <FormControlLabel
//           aria-label={i18nLabel}
//           classes={{
//             label: props.classes.switchLabel,
//           }}
//           control={
//             <Switch
//               checked={props.state.exclusionState === IncludeExclusionState.INCLUDED}
//               onChange={
//                 props.onChange.bind(
//                   null,
//                   (props.state.exclusionState === IncludeExclusionState.INCLUDED ?
//                     IncludeExclusionState.EXCLUDED :
//                     IncludeExclusionState.INCLUDED),
//                 )
//               }
//             />
//           }
//           label={i18nLabel}
//         />
//       </FormControl>
//     </div>
//   );
// }
