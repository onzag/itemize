// import React from "react";
// import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
// import { ItemContext } from "../providers/item";
// import IncludeExclusionSwitch from "../base/IncludeExclusionSwitch";
// import IncludeCalloutWarning from "../base/IncludeCalloutWarning";
// import { IncludeContext } from "../../providers/include";
// interface IExclusionSwitchProps {
//   onChange?: (include: Include, newExclusionState: IncludeExclusionState) => void;
// }
// export function ExclusionSwitch(props: IExclusionSwitchProps) {
//   return (
//     <ItemContext.Consumer>
//       {
//         (itemContextualValue) => (
//           <IncludeContext.Consumer>
//             {
//               (includeContextualValue) => {
//                 if (!includeContextualValue) {
//                   throw new Error("The ExclusionSwitch must be in an Include context");
//                 }
//                 const onChange = (newExclusionState: IncludeExclusionState) => {
//                   if (props.onChange) {
//                     props.onChange(includeContextualValue.include, newExclusionState);
//                   }
//                   itemContextualValue.onIncludeSetExclusionState(
//                     includeContextualValue.include, newExclusionState,
//                   );
//                 };
//                 return (
//                   <IncludeExclusionSwitch
//                     include={includeContextualValue.include}
//                     state={includeContextualValue.state}
//                     onChange={onChange}
//                     forId={itemContextualValue.forId}
//                     forVersion={itemContextualValue.forVersion}
//                   />
//                 );
//               }
//             }
//           </IncludeContext.Consumer>
//         )
//       }
//     </ItemContext.Consumer>
//   );
// }
// export function CalloutWarning() {
//   return (
//     <IncludeContext.Consumer>
//       {
//         (includeContextualValue) => {
//           if (!includeContextualValue) {
//             throw new Error("The CalloutWarning must be in an Include context");
//           }
//           return (
//             <IncludeCalloutWarning
//               include={includeContextualValue.include}
//               state={includeContextualValue.state}
//             />
//           );
//         }
//       }
//     </IncludeContext.Consumer>
//   );
// }
