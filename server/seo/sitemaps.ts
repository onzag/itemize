export interface ISitemapLastQueryType {
  [id: string]: string,
};

export interface ISitemapJSONType {
  lastQueried: ISitemapLastQueryType;
  isIndex: boolean;
  entries: string[];
}

export function toXML(
  src: ISitemapJSONType,
  targetDomain: string,
  sourcePrefix: string,
  prefixURL?: string,
) {
  let result: string = "<?xml version='1.0' encoding='UTF-8'?>";
  if (src.isIndex) {
    result += "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
  } else {
    result += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
  }

  src.entries.forEach((entry) => {
    if (src.isIndex) {
      result += "<sitemap><loc>";
      result += sourcePrefix + (prefixURL || "") + entry;
      result += "</loc></sitemap>";
    } else {
      result += "<url><loc>";
      result += "https://" + targetDomain;
      if (prefixURL) {
        result += "/" + prefixURL
      }
      if (entry[0] !== "/") {
        result += "/";
      }
      result += entry
      result += "</loc></url>";
    }
  });

  if (src.isIndex) {
    result += "</sitemapindex>";
  } else {
    result += "</urlset>";
  }
}