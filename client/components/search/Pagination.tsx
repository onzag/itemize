import { useCallback, useState } from "react";
import { useLocationStateReader } from "../navigation/LocationStateReader";

export interface IPaginatorInternalObject {
  limit: number;
  offset: number;
  page: number;
  pageSize: number;
  windowSize: number;
  pageTotal: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
}

interface IQSPagedSearchLoaderOptions extends IGeneralSearchLoaderOptions {
  windowSize: number;
  queryStringPageLocation?: string;
}

interface IPagedSearchLoaderOptions extends IGeneralSearchLoaderOptions {
  windowSize: number;
  page: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
}

interface ILocalPagedSearchLoaderOptions extends IGeneralSearchLoaderOptions {
  windowSize: number;
}

export function useQSPaginator(options: IQSPagedSearchLoaderOptions): IPaginatorInternalObject {
  if (!Number.isInteger(options.windowSize / options.pageSize)) {
    throw new Error("The window size is not divisible by the page size exactly");
  }

  const qLoc = options.queryStringPageLocation || "p";

  if (qLoc === "r") {
    throw new Error("The query string location cannot be \"r\" as that's reserved");
  }

  const [location, setLocation] = useLocationStateReader({
    stateIsInQueryString: true,
    defaultState: {
      [qLoc]: "1",
      "r": "f",
    },
  });
  const currentPage = parseInt(location[qLoc]);

  // zero based index of the page
  const actualP = currentPage - 1;
  // get the window that our page is in based on our loading strategy
  // this will give the 0 based index of the window
  const actualWindowP = Math.floor((actualP * options.pageSize) / options.windowSize);

  // the limit offset refer to the window
  // they will be recalculated depending on the window
  const limit = options.windowSize;
  const offset = options.windowSize * actualWindowP;

  const goToNextPage = useCallback(() => {
    setLocation({[qLoc]: (currentPage + 1).toString(), "r": "t"});
  }, [currentPage, setLocation]);

  const goToPrevPage = useCallback(() => {
    if (currentPage === 1) {
      return;
    }
    setLocation({[qLoc]: (currentPage - 1).toString(), "r": "t"});
  }, [currentPage, setLocation]);

  const goToPage = useCallback((pageN: number) => {
    setLocation({[qLoc]: (pageN - 1).toString(), "r": "t"});
  }, [setLocation]);

  // how many windows before our page
  const windowsBeforeThis = actualWindowP;
  const pagesInWindow = options.windowSize / options.pageSize;
  const pagesBeforeThis = pagesInWindow * windowsBeforeThis;

  return {
    limit,
    offset,
    page: currentPage - pagesBeforeThis,
    pageTotal: currentPage,
    pageSize: options.pageSize,
    windowSize: options.windowSize,
    goToNextPage,
    goToPrevPage,
    goToPage,
  }
}

export function usePaginator(options: IPagedSearchLoaderOptions): IPaginatorInternalObject {
  if (!Number.isInteger(options.windowSize / options.pageSize)) {
    throw new Error("The window size is not divisible by the page size exactly");
  }

  // zero based index of the page
  const actualP = options.page - 1;
  // get the window that our page is in based on our loading strategy
  // this will give the 0 based index of the window
  const actualWindowP = Math.floor((actualP * options.pageSize) / options.windowSize);

  // the limit offset refer to the window
  // they will be recalculated depending on the window
  const limit = options.windowSize;
  const offset = options.windowSize * actualWindowP;

  // how many windows before our page
  const windowsBeforeThis = actualWindowP;
  const pagesInWindow = options.windowSize / options.pageSize;
  const pagesBeforeThis = pagesInWindow * windowsBeforeThis;

  return {
    limit,
    offset,
    page: options.page - pagesBeforeThis,
    pageTotal: options.page,
    pageSize: options.pageSize,
    windowSize: options.windowSize,
    goToNextPage: options.goToNextPage,
    goToPrevPage: options.goToPrevPage,
    goToPage: options.goToPage,
  }
}

export function useLocalPaginator(options: ILocalPagedSearchLoaderOptions): IPaginatorInternalObject {
  const [currentPage, setCurrentPage] = useState(1);
  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage]);
  const goToPrevPage = useCallback(() => {
    if (currentPage === 1) {
      return;
    }
    goToPage(currentPage - 1);
  }, [currentPage]);
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  return usePaginator({
    goToNextPage,
    goToPage,
    goToPrevPage,
    page: currentPage,
    pageSize: options.pageSize,
    windowSize: options.windowSize,
  });
}

export interface IGeneralSearchLoaderOptions {
  /**
   * The page size
   */
  pageSize: number;
}