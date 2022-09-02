import React from "react";
import type { RenderElementProps } from "slate-react";
import { RichElement, isBlock, isSuperBlock } from "../../../internal/text/serializer";

interface ICurrentelementProviderProps {
  block: RichElement;
  superblock: RichElement;
  inline: RichElement;
}

const CurrentElementContext = React.createContext<ICurrentelementProviderProps>(null);

export class CurrentElementProvider extends React.PureComponent<ICurrentelementProviderProps> {
  public render() {
    return (
      <CurrentElementContext.Provider value={this.props}>{this.props.children}</CurrentElementContext.Provider>
    )
  }
}

interface ICurrentElementRetrieverProps extends RenderElementProps {
  fn: (
    passedProps: RenderElementProps,
    isSelected: boolean,
    selectionCriteria: "block" | "superblock" | "inline",
    selectionIsPrimary: boolean,
  ) => React.ReactNode;
}

interface ICurrentElementRetrieverOptimizerProps extends ICurrentElementRetrieverProps {
  isSelected: boolean;
  selectionCriteria: "block" | "superblock" | "inline";
  selectionIsPrimary: boolean;
}

class CurrentElementRetrieverOptimizer extends React.PureComponent<ICurrentElementRetrieverOptimizerProps> {
  public render() {
    return (
      this.props.fn({
        attributes: this.props.attributes,
        children: this.props.children,
        element: this.props.element,
      }, this.props.isSelected, this.props.selectionCriteria, this.props.selectionIsPrimary)
    );
  }
}

export class CurrentElementRetriever extends React.PureComponent<ICurrentElementRetrieverProps> {
  constructor(props: ICurrentElementRetrieverProps) {
    super(props);

    this.consume = this.consume.bind(this);
  }

  public consume(selection: ICurrentelementProviderProps) {
    const elementInQuestion = this.props.element;
    let isSelected = false;
    let selectionCriteria: "block" | "superblock" | "inline" = null;
    let selectionIsPrimary: boolean = false;
    if (isBlock(elementInQuestion)) {
      selectionCriteria = "block";
      isSelected = selection.block === elementInQuestion;
      selectionIsPrimary = !selection.inline;
    } else if (isSuperBlock(elementInQuestion)) {
      selectionCriteria = "superblock";
      isSelected = selection.superblock === elementInQuestion;
      selectionIsPrimary = !selection.block && !selection.inline;
    } else {
      selectionCriteria = "inline";
      isSelected = selection.inline === elementInQuestion;
      selectionIsPrimary = true;
    }

    return (
      <CurrentElementRetrieverOptimizer
        {...this.props}
        isSelected={isSelected}
        selectionCriteria={selectionCriteria}
        selectionIsPrimary={selectionIsPrimary}
      />
    )
  }

  public render() {
    return (
      <CurrentElementContext.Consumer>{this.consume}</CurrentElementContext.Consumer>
    )
  }
}