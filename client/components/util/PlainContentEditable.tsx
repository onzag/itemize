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

  onKeyDown?: (ev: KeyboardEvent) => void;
  onKeyUp?: (ev: KeyboardEvent) => void;
  onMouseDown?: (ev: MouseEvent) => void;
  onMouseUp?: (ev: MouseEvent) => void;
  onMouseOver?: (ev: MouseEvent) => void;
  onMouseEnter?: (ev: MouseEvent) => void;
  onMouseLeave?: (ev: MouseEvent) => void;
  onMouseMove?: (ev: MouseEvent) => void;
  onTouchStart?: (ev: TouchEvent) => void;
  onTouchMove?: (ev: TouchEvent) => void;
  onTouchEnd?: (ev: TouchEvent) => void;
}

const eventMap = {
  keydown: "onKeyDown",
  keyup: "onKeyUp",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mousemove: "onMouseMove",
  mouseover: "onMouseOver",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  touchstart: "onTouchStart",
  touchmove: "onTouchMove",
  touchend: "onTouchEnd",
};

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
    
    Object.keys(eventMap).forEach(eventType => {
      const prop = eventMap[eventType];
      if (nextProps[prop] !== this.props[prop]) {
        this.props[prop] && this.elemRef.current.removeEventListener(eventType, this.props[prop]);
        nextProps[prop] && this.elemRef.current.addEventListener(eventType, nextProps[prop]);
      }
    });

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