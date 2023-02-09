import React from "react";

interface IPlainContentEditableProps {
  as?: string;
  className?: string;
  onChange: (newValue: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  readOnly?: boolean;
  children: string;
  autoFocus?: boolean;
  lang?: string;
}

export default class PlainContentEditable extends React.Component<IPlainContentEditableProps> {
  private elemRef: React.RefObject<HTMLElement>;

  constructor(props: IPlainContentEditableProps) {
    super(props);

    this.elemRef = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  public onChange() {
    this.props.onChange(this.elemRef.current.textContent);
  }
  public onFocus() {
    this.props.onFocus && this.props.onFocus();
    this.onChange();
  }
  public onBlur() {
    this.props.onBlur && this.props.onBlur();
    this.onChange();
  }
  public componentDidMount() {
    if (this.props.autoFocus) {
      this.elemRef.current.focus();
    }
  }
  public shouldComponentUpdate(nextProps: IPlainContentEditableProps) {
    if (nextProps.className !== this.props.className) {
      this.elemRef.current.className = nextProps.className;
    }

    if (nextProps.readOnly !== this.props.readOnly) {
      if (!nextProps.readOnly) {
        this.elemRef.current.removeAttribute("contenteditable");
      } else {
        this.elemRef.current.setAttribute("contenteditable", "true");
      }
    }

    if (nextProps.children !== this.elemRef.current.textContent) {
      this.elemRef.current.textContent = nextProps.children;
    }

    return false;
  }
  public render() {
    const Element: any = this.props.as || "span";
    return (
      <Element
        className={this.props.className}
        ref={this.elemRef}
        onInput={this.onChange}
        onPaste={this.onChange}
        onCut={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        contentEditable={!this.props.readOnly}
        suppressContentEditableWarning={true}
        lang={this.props.lang}
      >{this.props.children}</Element>
    )
  }
}