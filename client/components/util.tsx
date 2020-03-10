import React, { useState, useEffect } from "react";
import { IGQLFile } from "../../gql-querier";

interface ITitleSetterProps {
  children: string;
}

let TitleSetterInstanceIsLoaded = false;
const TitleSetterChangedTitleListeners = new Map<TitleReader, () => void>();
export class TitleSetter extends React.Component<ITitleSetterProps, {}> {
  private originalTitle: string;
  constructor(props: ITitleSetterProps) {
    super(props);
  }
  public componentDidMount() {
    if (TitleSetterInstanceIsLoaded) {
      throw new Error("Two instances of TitleSetter have been loaded at once, this is not allowed");
    }

    TitleSetterInstanceIsLoaded = true;
    this.originalTitle = document.title;
    document.title = this.props.children || "";
    if (this.originalTitle !== document.title) {
      TitleSetterChangedTitleListeners.forEach((listener) => listener());
    }
  }
  public componentDidUpdate(prevProps: ITitleSetterProps) {
    if ((prevProps.children || "") !== (this.props.children || "")) {
      document.title = this.props.children || "";
      TitleSetterChangedTitleListeners.forEach((listener) => listener());
    }
  }
  public componentWillUnmount() {
    document.title = this.originalTitle;
    TitleSetterInstanceIsLoaded = false;
  }
  public render() {
    return null;
  }
}

export class TitleReader extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  public componentDidMount() {
    TitleSetterChangedTitleListeners.set(this, this.forceUpdate.bind(this));
  }
  public componentWillUnmount() {
    TitleSetterChangedTitleListeners.delete(this);
  }
  public render() {
    return document.title;
  }
}

export function imageSizeRetriever(fileData: IGQLFile) {
  let imageMediumSizeURL = fileData && fileData.url;
  let imageSmallSizeURL = fileData && fileData.url;
  let imageLargeSizeURL = fileData && fileData.url;
  let imageStandardSizeURL = fileData && fileData.url;
  if (
    fileData &&
    fileData.url.indexOf("blob:") !== 0 &&
    fileData.type.indexOf("svg") !== 0
  ) {
    const splittedURL = fileData.url.split("/");
    const fileName = splittedURL.pop();
    const baseURL = splittedURL.join("/");
    const fileNameDotSplitted = fileName.split(".");
    fileNameDotSplitted.pop();
    const recoveredFileName = fileNameDotSplitted.join(".");
    const fileNameWithoutExtension =
      recoveredFileName === "" ?
        fileName :
        recoveredFileName;
    imageMediumSizeURL = baseURL + "/medium_" + fileNameWithoutExtension + ".jpg";
    imageSmallSizeURL = baseURL + "/small_" + fileNameWithoutExtension + ".jpg";
    imageLargeSizeURL = baseURL + "/large_" + fileNameWithoutExtension + ".jpg";
  }

  return {
    imageMediumSizeURL,
    imageSmallSizeURL,
    imageLargeSizeURL,
    imageStandardSizeURL,
  }
}

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

export class CacheableImageLoader extends React.PureComponent<CacheableImageLoaderProps, CacheableImageLoaderState> {
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
        this.setState({
          url: URL.createObjectURL(blob),
          irrevokable: false,
        });
      } catch {
        this.revokeOlderImage();
        this.setState({
          url: "/rest/resource/image-fail.svg",
          irrevokable: true,
        });
      }
    } else {
      this.revokeOlderImage();
      this.setState({
        url: null,
        irrevokable: false,
      });
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
  public render() {
    if (this.props.children) {
      return this.props.children(this.state.url);
    } else {
      return <img className={this.props.className} alt={this.props.alt} src={this.state.url}/>;
    }
  }
}