import type { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import type { IPropertyReadProps } from "./base";
import Reader from "./Reader";
import React from "react";
import equals from "deep-equal";
import { SearchVariants } from "../../../constants";

interface IPropertyReadOneProp<PDEF extends PropertyDefinitionSupportedType> extends
  Omit<IPropertyReadProps<PDEF, string, SearchVariants>, 'children'> {
}

interface IReaderManyProps {
  data: Array<IPropertyReadOneProp<PropertyDefinitionSupportedType> | string>;
  useAppliedValue?: boolean;
  children?: (...values: PropertyDefinitionSupportedType[]) => React.ReactNode;
}

interface IReaderManyInternalProps extends IReaderManyProps {
  accumulated: PropertyDefinitionSupportedType[];
}

class ReaderManyInternal extends React.Component<IReaderManyInternalProps> {
  constructor(props: IReaderManyInternalProps) {
    super(props);

    this.renderNextInternal = this.renderNextInternal.bind(this);
  }
  public shouldComponentUpdate(prevProps: IReaderManyInternalProps) {
    return !equals(prevProps.accumulated, this.props.accumulated, { strict: true }) ||
      !equals(prevProps.data, this.props.data, { strict: true }) ||
      prevProps.useAppliedValue !== this.props.useAppliedValue ||
      prevProps.children !== this.props.children;
  }
  public renderNextInternal(value: PropertyDefinitionSupportedType) {
    const newData = [...this.props.data];
    newData.shift();

    const newAccumulated = [...this.props.accumulated, value];

    return (
      <ReaderManyInternal
        {...this.props}
        data={newData}
        accumulated={newAccumulated}
      />
    );
  }
  public render() {
    if (this.props.data.length === 0) {
      return this.props.children(...this.props.accumulated);
    }

    let current: IPropertyReadOneProp<any> = this.props.data[0] as IPropertyReadOneProp<any>;
    if (typeof current === "string") {
      current = {
        id: current,
      }
    }
    if (this.props.useAppliedValue) {
      current.useAppliedValue = true;
    }
    return (
      <Reader {...current}>
        {this.renderNextInternal}
      </Reader>
    );
  }
}

export default function ReaderMany(props: IReaderManyProps) {
  return (
    <ReaderManyInternal
      {...props}
      accumulated={[]}
    />
  );
}