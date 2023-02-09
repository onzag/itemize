import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface IBodyScrollKeeperOptions {
  scrollElement?: string;
}

interface IBodyScrollKeeperProps extends IBodyScrollKeeperOptions {
  children?: React.ReactNode;
}

const STORED_SCROLLS: {
  [p: string]: number;
} = {};

function onStoreScroll(path: string, e: Event) {
  if (e.target === document) {
    STORED_SCROLLS[path] = (document.body.parentElement as any).scrollTop;
  } else {
    STORED_SCROLLS[path] = (e.target as HTMLElement).scrollTop;
  }
}

export default function BodyScrollKeeper(props: IBodyScrollKeeperProps) {
  useBodyScrollKeeper(props);

  // typescript bugs
  return (props.children as any) || (null as any);
}

export function useBodyScrollKeeper(options: IBodyScrollKeeperOptions) {
  const location = useLocation();
  const scrollRestorerAttemper = useRef(null as any);

  // whenever we change location
  useEffect(() => {
    // clear the previous scroll keeper
    clearInterval(scrollRestorerAttemper.current);

    // get the element regarding scrolling
    const element = !options.scrollElement ?
      document.body.parentElement :
      document.body.querySelector(options.scrollElement);

    // if we got it
    if (element) {
      // we are using hash
      const hashExpected = location.hash;

      // find it
      if (hashExpected) {
        // scroll to it
        const hashElement = document.querySelector(hashExpected);

        if (hashElement) {
          hashElement.scrollIntoView();
          return;
        }

        // maybe it hasn't loaded yet
        let attempts = 0;
        scrollRestorerAttemper.current = setInterval(() => {
          attempts++;
          const hashElement = document.querySelector(hashExpected);

          if (hashElement) {
            hashElement.scrollIntoView();
          }

          if (hashElement || attempts >= 100) {
            clearInterval(scrollRestorerAttemper.current);
          }
        }, 20);

        return;
      }

      // restore the old position
      const scrollPositionExpected = STORED_SCROLLS[location.pathname] || 0;
      if (scrollPositionExpected === 0) {
        element.scrollTop = 0;
      } else {
        element.scrollTop = scrollPositionExpected;

        // lost scroll position, maybe it hasn't loaded yet
        if (element.scrollTop !== scrollPositionExpected) {
          let attempts = 0;
          scrollRestorerAttemper.current = setInterval(() => {
            attempts++;
            element.scrollTop = scrollPositionExpected;

            if (element.scrollTop === scrollPositionExpected || attempts >= 100) {
              clearInterval(scrollRestorerAttemper.current);
            }
          }, 20);
        }
      }
    }
  }, [location.pathname, location.hash]);

  // store the last scroll position
  useEffect(() => {
    const element = !options.scrollElement ?
      window :
      document.body.querySelector(options.scrollElement);

    const boundFn = onStoreScroll.bind(null, location.pathname);

    if (element) {
      element.addEventListener("scroll", boundFn);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", boundFn);
      }
    }
  }, [options.scrollElement, location.pathname]);
}