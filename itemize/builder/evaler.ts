export function evalRawJSON<T>(
  config: any,
  rawJSON: T,
): T {
  if (typeof rawJSON === "string" && rawJSON.startsWith("$CONFIG:")) {
    const code = rawJSON.replace("$CONFIG:", "");
    const fn = new Function("config", code);
    return fn(config);
  } else if (Array.isArray(rawJSON)) {
    return rawJSON.map((iRawJSON) => evalRawJSON(config, iRawJSON)) as any;
  } else if (typeof rawJSON !== "object" || rawJSON === null) {
    return rawJSON;
  }

  const newObj = {};

  Object.keys(rawJSON).forEach((key) => {
    newObj[key] = evalRawJSON(config, rawJSON[key]);
  });

  return newObj as T;
}
