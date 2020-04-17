import React from "react";
import { IPropertyEntryProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { IAutocompleteOutputType } from "../../../../base/Autocomplete";

interface IPropertyEntryFieldState {
  suggestions: IAutocompleteOutputType[];
}

export interface IPropertyEntryFieldRendererProps extends IPropertyEntryRendererProps<string> {
  autocompleteMode: boolean;
  autocompleteSuggestions: IAutocompleteOutputType[];
  autocompleteIsLocalized: boolean;

  type: "string" | "password";
  subtype?: "email";
  htmlAutocomplete?: string;

  onRequestToFetchSuggestions: (value: string) => Promise<void>;
  onRequestToClearSuggestions: () => void;
}

export default class PropertyEntryField
  extends React.Component<IPropertyEntryProps<string, IPropertyEntryFieldRendererProps>, IPropertyEntryFieldState> {

  private lastAutocompleteFetchRequestTime: number;

  constructor(props: IPropertyEntryProps<string, IPropertyEntryFieldRendererProps>) {
    super(props);

    // set the state, contains suggestions and whether it is
    // visible or not, mainly for use with type password
    this.state = {
      suggestions: [],
    };

    // binding all the functions
    this.onRequestToFetchSuggestions = this.onRequestToFetchSuggestions.bind(this);
    this.onRequestToClearSuggestions = this.onRequestToClearSuggestions.bind(this);
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps<string, IPropertyEntryFieldRendererProps>,
    nextState: IPropertyEntryFieldState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state.suggestions, nextState.suggestions) ||
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

    // get the invalid reason if any
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

    // set the input mode, this is for mobile,
    // basically according to our input we need
    // different keys
    const type = this.props.property.getType();
    const subtype = this.props.property.getSubtype();

    const RendererElement = this.props.renderer;
    const rendererArgs = {
      autocompleteMode: this.props.property.hasAutocomplete(),
      autocompleteSuggestions: this.state.suggestions,
      autocompleteIsLocalized: this.props.property.isAutocompleteLocalized(),

      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      type: type as any,
      subtype: subtype as any,
      htmlAutocomplete: this.props.property.getHTMLAutocomplete(),
      icon: this.props.icon,

      currentValue: this.props.state.value as string,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled: this.props.state.enforced,

      autoFocus: this.props.autoFocus || false,

      onChange: this.props.onChange,
      onRequestToFetchSuggestions: this.onRequestToFetchSuggestions,
      onRequestToClearSuggestions: this.onRequestToClearSuggestions,
    };

    return <RendererElement {...rendererArgs}/>
  }

  public async onRequestToFetchSuggestions(value: string) {
    const currentFetchRequestTimeId = (new Date()).getTime();
    this.lastAutocompleteFetchRequestTime = currentFetchRequestTimeId;

    try {
      const result =
        await fetch(
          "/rest/autocomplete/" + this.props.property.getAutocompleteId() +
          "?body=" + encodeURIComponent(JSON.stringify({
            lang: this.props.property.isAutocompleteLocalized() ? this.props.language : null,
            query: value,
            filters: this.props.property.getAutocompletePopulatedFiltersFor(
              this.props.forId,
              this.props.forVersion,
            ),
          })),
          {
            headers: {
              "sw-cacheable": "true",
            },
          },
        );
      const output: IAutocompleteOutputType[] = await result.json();
      if (currentFetchRequestTimeId === this.lastAutocompleteFetchRequestTime) {
        this.setState({
          suggestions: output,
        });
      }
      if (this.props.property.isAutocompleteLocalized()) {
        const suggestionFound = output.find((s) => s.i18n === this.props.state.internalValue || "");
        if (suggestionFound && suggestionFound.value !== this.props.state.value) {
          this.props.onChange(suggestionFound.value, this.props.state.internalValue);
        }
      }
    } catch (err) {
      this.setState({
        suggestions: [],
      });
    }
  }

  public onRequestToClearSuggestions() {
    // prevent delayed suggestion for being displayed
    this.lastAutocompleteFetchRequestTime = (new Date()).getTime();
    this.setState({
      suggestions: [],
    });
  }
}
