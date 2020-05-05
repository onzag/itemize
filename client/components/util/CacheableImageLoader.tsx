import React from "react";

type CacheableImageLoaderCallback = (src: string) => React.ReactNode;

interface CacheableImageLoaderProps {
  src: string;
  className?: string;
  children?: CacheableImageLoaderCallback;
  alt?: string;
}

interface CacheableImageLoaderState {
  url: string;
  irrevokable: boolean;
}

export default class CacheableImageLoader extends React.PureComponent<CacheableImageLoaderProps, CacheableImageLoaderState> {
  private unmounted: boolean = false;
  constructor(props: CacheableImageLoaderProps) {
    super(props);

    const isPropBlob = props.src && props.src.indexOf("blob:") === 0;
    this.state = {
      url: isPropBlob ? props.src : null,
      irrevokable: isPropBlob,
    };
  }
  public revokeOlderImage() {
    if (this.state.url && !this.state.irrevokable) {
      URL.revokeObjectURL(this.state.url);
    }
  }
  public async loadImage() {
    if (this.unmounted) {
      return;
    }
    if (this.props.src && this.props.src.indexOf("blob:") === 0) {
      this.setState({
        url: this.props.src,
        irrevokable: true,
      });
      return;
    }
    if (this.props.src) {
      try {
        const res = await fetch(this.props.src, {
          headers: {
            "sw-cacheable": "true",
          },
        });
        const blob = await res.blob();
        this.revokeOlderImage();
        if (!this.unmounted) {
          this.setState({
            url: URL.createObjectURL(blob),
            irrevokable: false,
          });
        }
      } catch {
        this.revokeOlderImage();
        if (!this.unmounted) {
          this.setState({
            url: "/rest/resource/image-fail.svg",
            irrevokable: true,
          });
        }
      }
    } else {
      this.revokeOlderImage();
      if (!this.unmounted) {
        this.setState({
          url: null,
          irrevokable: false,
        });
      }
    }
  }
  public componentDidMount() {
    this.loadImage();
  }
  public componentDidUpdate(prevProps: CacheableImageLoaderProps) {
    if (prevProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  public componentWillUnmount() {
    
  }
  public render() {
    if (this.props.children) {
      return this.props.children(this.state.url);
    } else {
      return <img className={this.props.className} alt={this.props.alt} src={this.state.url}/>;
    }
  }
}