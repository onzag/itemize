/**
 * Contains the property view file renderer
 * 
 * @module
 */

import I18nRead from "../../../components/localization/I18nRead";
import React from "react";

export default function PropertyViewFileUSSDRenderer() {
  return (
    <span>[<I18nRead id="rich_file"/>]</span>
  );
}