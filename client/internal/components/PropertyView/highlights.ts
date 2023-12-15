import { escapeHtml, escapeStringRegexp } from "../../../../util";
import type { IElasticHighlighPropertyInfo } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

/**
 * Given full highlights it will extract them into standard highlights to be used
 * for standard matching
 * @param highlights 
 */
export function extractHighlightsFromFull(highlights: IElasticHighlighPropertyInfo): IElasticHighlighPropertyInfo {
  if (!highlights || !highlights.highlights) {
    return highlights;
  }
  // we will find all between <b> and </b> and mark it as each token that matched
  if (highlights.full) {
    // this will be it
    const newValue: IElasticHighlighPropertyInfo = {
      full: false,
      highlights: [],
      match: highlights.match,
      lang: highlights.lang,
    };

    // now we loop in
    highlights.highlights.forEach((h) => {
      // start accumulating and specify if we are in
      let accum = "";
      let isInHighlightMatch = false;

      // now start loop into characters
      for (let char of h) {
        // and put them into the accumulator
        accum += char;

        // now we are starting to get in
        if (accum.endsWith("<b>")) {
          accum = "";
          isInHighlightMatch = true;
        }

        // and we have ended the match
        if (accum.endsWith("</b>")) {
          if (isInHighlightMatch) {
            // if we were into it we will replace the bad ending
            const tokensMatched = accum.replace("</b>", "");
            // and split that to get each token
            tokensMatched.split(" ").forEach((token) => {
              // trim it and inject it into
              const trimmed = token.trim();
              if (trimmed) {
                newValue.highlights.push(trimmed);
              }
            });
          }

          // and we clear our accumulator
          accum = "";
          isInHighlightMatch = false;
        }
      }
    });

    return newValue;
  } else {
    return highlights;
  }
}

/**
 * Applies the highlights
 * @param strRaw a plain string value
 * @param highlights the highlights to apply
 * @returns an object on whether it was applied, if it was, the result will be HTML encoded as rich text
 */
export function applyHighlights(strRaw: string, highlightsRaw: IElasticHighlighPropertyInfo) {
  if (!strRaw || !highlightsRaw || Object.keys(highlightsRaw).length === 0 || !highlightsRaw.highlights) {
    return {
      value: strRaw,
      applied: false,
    };
  }

  const highlights = extractHighlightsFromFull(highlightsRaw);

  const splitted = highlights.match.trim().split(" ");
  const lastWordPrefix = splitted[splitted.length - 1].toLowerCase();

  if (!lastWordPrefix) {
    return {
      value: strRaw,
      applied: false,
    };
  }

  const htmlEscaped = escapeHtml(strRaw);

  const expectedHighlights = (highlights.highlights || []).map((p) => escapeHtml(p.toLowerCase()));
  const lastWordRegex: RegExp = new RegExp(escapeStringRegexp(escapeHtml(lastWordPrefix)), "ig");
  const expectedHighlightsReg = expectedHighlights.map((p) => new RegExp(escapeStringRegexp(p), "ig"));

  let newHTMLEscaped = htmlEscaped;
  let applied = false;
  for (let regToReplace of expectedHighlightsReg) {
    newHTMLEscaped = newHTMLEscaped.replaceAll(regToReplace, (str) => {
      const lower = str.toLowerCase();
      if (lower === lastWordPrefix) {
        applied = true;
        return "<b>" + str + "</b>";
      }
      // we replace only if we are prefixed with the given last word regex prefix
      const selfReplaced = str.replaceAll(lastWordRegex, (str2, pos) => pos === 0 ? (str2 + "</b>") : str2);
      // it changed
      if (selfReplaced !== str) {
        // partial prefix match
        applied = true;
        return "<b>" + selfReplaced;
      } else {
        // eg when words like "hacer" match "haciendo"
        // they are the same verb but different so the whole is fully matched
        applied = true;
        return "<b>" + str + "</b>";
      }
    });
  }

  if (!applied) {
    return {
      value: strRaw,
      applied,
    }
  }

  return {
    value: newHTMLEscaped,
    applied,
  }
}