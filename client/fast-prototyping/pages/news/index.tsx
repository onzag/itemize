/**
 * Provides the news page and all its subpages for fast prototyping
 * 
 * TODO
 * 
 * @packageDocumentation
 */

import React from "react";
import { Articles } from "./articles";
import { Article } from "./article";
import Route from "../../../components/navigation/Route";

/**
 * Provides the news page and all its subpages for fast prototyping
 */
export function News() {
  return (
    <>
      <Route path="/news" exact={true} component={Articles} />
      <Route path="/news/:id" exact={true} component={Article} />
    </>
  );
};