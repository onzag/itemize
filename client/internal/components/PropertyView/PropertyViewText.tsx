import React from "react";
import { IPropertyViewHandlerProps, IPropertyViewRendererProps } from ".";
import { DOMPurify, escapeStringRegexp } from "../../../../util";
import equals from "deep-equal";
import { PropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import { fileURLAbsoluter, imageSrcSetRetriever } from "../../../components/util";

export interface IPropertyViewTextRendererProps extends IPropertyViewRendererProps<PropertyDefinitionSupportedTextType> {
  isRichText: boolean;
}

export class PropertyViewText extends React.Component<IPropertyViewHandlerProps<IPropertyViewTextRendererProps>> {
  constructor(props: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>) {
    super(props);
  }
  public shouldComponentUpdate(
    nextProps: IPropertyViewHandlerProps<IPropertyViewTextRendererProps>,
  ) {
    // This is optimized to only update for the thing it uses
    return this.props.state.value !== nextProps.state.value ||
      nextProps.renderer !== this.props.renderer ||
      nextProps.property !== this.props.property ||
      nextProps.forId !== this.props.forId ||
      nextProps.forVersion !== this.props.forVersion ||
      !!this.props.rtl !== !!nextProps.rtl ||
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }
  public render() {
    let currentValue: string = this.props.state.value as string;
    if (this.props.property.isRichText()) {
      currentValue = DOMPurify.sanitize(currentValue);

      const relatedPropertyName = this.props.property.getSpecialProperty("mediaProperty") as string;
      if (relatedPropertyName) {
        const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
        const currentFiles =
          relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

        if (currentFiles && currentFiles.length) {
          currentFiles.forEach((cf) => {
            const absolutedFile = fileURLAbsoluter(
              cf,
              this.props.itemDefinition,
              this.props.forId,
              this.props.forVersion || null,
              this.props.include,
              relatedProperty,
            );
            const srcset = imageSrcSetRetriever(absolutedFile, relatedProperty);
            const attrShape = `data-src-id="${cf.id}"`;
            // TODO check these if they do not represent a vulnerability, escape them otherwise
            const attrReplacement = `sizes="70vw" srcset="${srcset}" src="${absolutedFile ? absolutedFile.url : "/rest/resource/image-fail.svg"}" ${attrShape}`;
            const attrShapeRegex = new RegExp(escapeStringRegexp(attrShape), "g");
            currentValue = currentValue.replace(attrShapeRegex, attrReplacement);
          });
        }
      }
    }

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyViewTextRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      currentValue,
      isRichText: this.props.property.isRichText(),
    };

    return <RendererElement {...rendererArgs}/>
  }
}
