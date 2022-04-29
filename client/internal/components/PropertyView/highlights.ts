import { escapeStringRegexp } from "../../../../util";
import type { IElasticHighlighPropertyInfo } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

export function applyHighlights(str: string, highlights: IElasticHighlighPropertyInfo) {
  if (!str || !highlights || Object.keys(highlights).length === 0) {
    return {
      value: str,
      applied: false,
    };
  }

  const splitted = highlights.match.trim().split(" ");
  const lastWordPrefix = splitted[splitted.length - 1].toLowerCase();

  if (!lastWordPrefix) {
    return {
      value: str,
      applied: false,
    };
  }

  const expectedHighlights = (highlights.highlights || []).map((p) => p.toLowerCase());
  const lastWordRegex: RegExp = new RegExp(escapeStringRegexp(lastWordPrefix), "ig");
  const expectedHighlightsReg = expectedHighlights.map((p) => new RegExp(escapeStringRegexp(p), "ig"));

  let newStr = str;
  let applied = false;
  for (let regToReplace of expectedHighlightsReg) {
    newStr = newStr.replaceAll(regToReplace, (str) => {
      const lower = str.toLowerCase();
      if (lower === lastWordPrefix) {
        applied = true;
        return "<b>" + str + "</b>";
      }
      // we replace only if we are prefixed with the given last word regex prefix
      const selfReplaced = str.replaceAll(lastWordRegex, (str2, pos) => pos === 0 ? "<b>" + str2 + "</b>" : str2);
      // it changed
      if (selfReplaced !== str) {
        // partial prefix match
        applied = true;
        return selfReplaced;
      } else {
        // eg when words like "hacer" match "haciendo"
        // they are the same verb but different so the whole is fully matched
        applied = true;
        return "<b>" + str + "</b>";
      }
    });
  }

  return {
    value: newStr,
    applied,
  }
}