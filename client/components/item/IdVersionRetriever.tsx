/**
 * Allows to retrieve the actual id and version of the item that is currently in the context
 * this is very useful when using unversioned loaded values in order to know if it's the unversioned
 * that is loaded
 *
 * @packageDocumentation
 */

import React from "react";
import {
  ItemContext,
  IItemContextType,
} from "../../providers/item";

/**
 * The arg that it provides
 */
export interface IIdVersionRetrieverArg {
  id: string;
  version: string;
}

/**
 * The submit actioner props, it basically takes nothing
 * but the children itself
 */
interface IIdVersionRetrieverProps {
  children: (arg: IIdVersionRetrieverArg) => React.ReactNode;
}

/**
 * The actual props for the actual actioner which includes the context
 * data
 */
interface IActualIdVersionRetrieverProps extends IIdVersionRetrieverProps {
  itemContext: IItemContextType;
}

/**
 * This is where the main logic happens, its in its own class in order to be
 * able to perform conditional rendering and avoid useless updates
 */
class ActualIdVersionRetriever extends React.Component<IActualIdVersionRetrieverProps> {
  public shouldComponentUpdate(nextProps: IActualIdVersionRetrieverProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemContext.forId !== this.props.itemContext.forId ||
      nextProps.itemContext.forVersion !== this.props.itemContext.forVersion;
  }
  public render() {
    return this.props.children({
      id: this.props.itemContext.forId,
      version: this.props.itemContext.forVersion,
    });
  }
}

/**
 * The id version retrieves provides the actually loaded id and version item
 * in the current context, this is useful to know what we actually loaded
 * when allowing unversioned fallbacks to load
 *
 * @param props the props
 * @returns a react component
 */
export default function IdVersionRetriever(props: IIdVersionRetrieverProps) {
  return (
    <ItemContext.Consumer>{
      (itemContext) => (
        <ActualIdVersionRetriever {...props} itemContext={itemContext} />
      )
    }</ItemContext.Consumer>
  );
}
