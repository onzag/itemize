import React from "react";
import { IPropertyViewFileRendererProps } from "../../../internal/components/PropertyView/PropertyViewFile";

const supportsImageLoading = typeof document !== "undefined" ? !!(document.createElement("img") as any).loading : false;

interface IPropertyViewFileRendererState {
  loaded: boolean;
}

export default class PropertyViewFileRenderer extends React.Component<IPropertyViewFileRendererProps, IPropertyViewFileRendererState> {
  private isScrollEventAttached: boolean = false;
  private refImg: React.RefObject<HTMLImageElement>;
  private io: IntersectionObserver;
  constructor(props: IPropertyViewFileRendererProps) {
    super(props);

    this.refImg = React.createRef<HTMLImageElement>();
    
    // loaded represents the properties src and srcset when using native
    // image loading it's unecessary to have them removed as the browser
    // will handle it natively
    this.state = {
      loaded: false,
    }
  }
  public attachScrollEvent() {
    if (!this.isScrollEventAttached) {
      this.isScrollEventAttached = true;
      document.body.addEventListener("scroll", this.checkWhetherInViewOldSchool);
    }
  }
  public removeScrollEvent() {
    if (this.isScrollEventAttached) {
      this.isScrollEventAttached = false;
      document.body.removeEventListener("scroll", this.checkWhetherInViewOldSchool);
    }
  }
  public checkWhetherInViewOldSchool() {
    const bounding = this.refImg.current.getBoundingClientRect();
    const isInView = (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    if (isInView) {
      this.setState({loaded: true});
      this.removeScrollEvent();
    } else {
      this.attachScrollEvent();
    }
  }
  public setupIntersectionObserver() {
    const target = this.refImg.current;
    if (!target) {
      this.setState({
        loaded: true,
      });
      return;
    }
    this.io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setState({
            loaded: true,
          });
          this.io.unobserve(target);
          this.io.disconnect();
        }
      });
    });
    this.io.observe(target);
  }
  public removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
    }
  }
  public componentDidMount() {
    // we can't know if supports image loading is valid via lazy yet because the constructor
    // can run within SSR
    const newLoadedState = this.props.args.lazyLoad && !supportsImageLoading ? false : true;
    if (newLoadedState !== this.state.loaded) {
      this.setState({
        loaded: newLoadedState,
      });
    }
    if (this.props.args.lazyLoad) {
      if (!(window as any).IntersectionObserver && !supportsImageLoading) {
        this.checkWhetherInViewOldSchool();
      } else if ((window as any).IntersectionObserver && !supportsImageLoading) {
        this.setupIntersectionObserver();
      }
    }
  }
  public componentDidUpdate(prevProps: IPropertyViewFileRendererProps) {
    if (this.props.args.lazyLoad && !prevProps.args.lazyLoad && !this.state.loaded) {
      if (!(window as any).IntersectionObserver && !supportsImageLoading) {
        this.checkWhetherInViewOldSchool();
      } else if ((window as any).IntersectionObserver && !supportsImageLoading) {
        this.setupIntersectionObserver();
      }
    }
  }
  public componentWillUnmount() {
    this.removeScrollEvent();
    this.removeIntersectionObserver();
  }
  public render() {
    if (!this.props.currentValue) {
      if (this.props.args.NullComponent) {
        const NullComponent = this.props.args.NullComponent;
        const nullArgs = this.props.args.nullComponentArgs;
        return <NullComponent {...nullArgs}/>;
      }
      return null;
    }
    if (this.props.isSupportedImage) {
      const imageClassName: string = this.props.args.imageClassName;
      const imageSizes: string = this.props.args.imageSizes || "70vw";
      return (
        <img
          ref={this.refImg}
          srcSet={!this.state.loaded ? null : this.props.imageSrcSet}
          sizes={imageSizes}
          data-src={this.props.currentValue.url}
          src={!this.state.loaded ? null : this.props.currentValue.url}
          className={imageClassName}
          loading={this.props.args.lazyLoad ? "lazy" : null}
          alt={this.props.currentValue.name}
        />
      )
    }
    return (
      <span className="file" onClick={this.props.openFile.bind(null, this.props.currentValue)}>
        <span className="file-container">
          <span className="file-icon">
            <span className="file-extension">{this.props.extension}</span>
          </span>
          <span className="file-name">{this.props.currentValue.name}</span>
          <span className="file-size">{this.props.prettySize}</span>
        </span>
      </span>
    );
  }
}