import React from "react";
import equals from "deep-equal";
import SearchLoader, { ISearchLoaderArg } from "./SearchLoader";

interface IPagedSearchLoaderArg extends ISearchLoaderArg {
  currentPage: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (n: number) => void;
}

interface IPagedSearchLoaderProps {
  pageSize: number;
  children: (arg: IPagedSearchLoaderArg) => any;
}

interface IPagedSearchLoaderState {
  currentPage: number;
}

export class PagedSearchLoader extends React.Component<IPagedSearchLoaderProps, IPagedSearchLoaderState> {
  constructor(props: IPagedSearchLoaderProps) {
    super(props);

    this.state = {
      currentPage: 0,
    };

    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }
  public goToNextPage(hasNextPage: boolean) {
    if (hasNextPage) {
      this.goToPage(this.state.currentPage + 1);
    }
  }
  public goToPrevPage(hasPrevPage: boolean) {
    if (hasPrevPage) {
      this.goToPage(this.state.currentPage - 1);
    }
  }
  public goToPage(n: number) {
    this.setState({
      currentPage: n,
    });
  }
  public shouldComponentUpdate(nextProps: IPagedSearchLoaderProps, nextState: IPagedSearchLoaderState) {
    return !equals(this.state, nextState) ||
      nextProps.pageSize !== this.props.pageSize ||
      nextProps.children !== this.props.children;
  }
  public render() {
    return (
      <SearchLoader
        pageSize={this.props.pageSize}
        currentPage={this.state.currentPage}
      >
        {(arg) => {
          return this.props.children({
            ...arg,
            currentPage: this.state.currentPage,
            goToNextPage: this.goToNextPage.bind(this, arg.hasNextPage),
            goToPrevPage: this.goToPrevPage.bind(this, arg.hasPrevPage),
            goToPage: this.goToPage,
          });
        }}
      </SearchLoader>
    );
  }
}
