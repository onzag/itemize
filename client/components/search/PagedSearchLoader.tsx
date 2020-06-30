import React from "react";
import equals from "deep-equal";
import SearchLoader, { ISearchLoaderArg } from "./SearchLoader";
import LocationStateReader from "../navigation/LocationStateReader";

export interface IPagedSearchLoaderArg extends ISearchLoaderArg {
  currentPage: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (n: number) => void;
}

interface IPagedSearchLoaderProps {
  pageSize: number;
  children: (arg: IPagedSearchLoaderArg) => any;
}

export class PagedSearchLoader extends React.Component<IPagedSearchLoaderProps> {
  constructor(props: IPagedSearchLoaderProps) {
    super(props);

    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.onSearchDataChange = this.onSearchDataChange.bind(this);
  }
  public goToNextPage(currentPage: number, hasNextPage: boolean, setState: (qs: {p: any}) => void) {
    if (hasNextPage) {
      // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
      setState({
        p: currentPage + 2,
      });
    }
  }
  public goToPrevPage(currentPage: number, hasPrevPage: boolean, setState: (qs: {p: any}) => void) {
    if (hasPrevPage) {
      // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
      setState({
        p: currentPage,
      });
    }
  }
  public goToPage(setState: (qs: {p: any}) => void, page: number) {
    setState({
      p: page + 1,
    });
  }
  public shouldComponentUpdate(nextProps: IPagedSearchLoaderProps) {
    return nextProps.pageSize !== this.props.pageSize ||
      nextProps.children !== this.props.children;
  }
  public onSearchDataChange(setState: (qs: {p: any}) => void) {
    setState({
      p: 1,
    });
    // load the first page, always despite what current page might be
    return 0;
  }
  public render() {
    return (
      <LocationStateReader defaultState={{ p: "1" }} stateIsInQueryString={true}>
        {(state, setState) => {
          let actualP = parseInt(state.p, 10) || 1;
          actualP--;
          return (
            <SearchLoader
              pageSize={this.props.pageSize}
              currentPage={actualP}
              onSearchDataChange={this.onSearchDataChange.bind(null, setState)}
            >
              {(arg) => {
                return this.props.children({
                  ...arg,
                  currentPage: actualP,
                  goToNextPage: this.goToNextPage.bind(this, actualP, arg.hasNextPage, setState),
                  goToPrevPage: this.goToPrevPage.bind(this, actualP, arg.hasPrevPage, setState),
                  goToPage: this.goToPage.bind(this, setState),
                });
              }}
            </SearchLoader>
          );
        }}
      </LocationStateReader>
    );
  }
}
