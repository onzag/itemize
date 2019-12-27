export function requestFieldsAreContained(requestFieldsSubset: any, requestFieldsOrValueMain: any): boolean {
  if (requestFieldsOrValueMain === null) {
    return true;
  }

  const subSetKeys = Object.keys(requestFieldsSubset);
  const mainKeys = Object.keys(requestFieldsOrValueMain);
  if (subSetKeys.length > mainKeys.length) {
    return false;
  } else if (subSetKeys.length === 0 && mainKeys.length === 0) {
    return true;
  }
  return subSetKeys.every((key) => {
    if (typeof requestFieldsOrValueMain[key] === "undefined") {
      return false;
    }

    if (typeof requestFieldsOrValueMain[key] === "object" && requestFieldsOrValueMain[key] !== null) {
      return requestFieldsAreContained(requestFieldsSubset[key], requestFieldsOrValueMain[key]);
    }
    return true;
  });
}

export function deepMerge(gqlValueOrFieldsOverride: any, gqlValueOfFieldsOverriden: any): any {
  if (typeof gqlValueOrFieldsOverride !== "object" || gqlValueOrFieldsOverride === null) {
    return gqlValueOrFieldsOverride;
  }

  const newObjMerge = {
    ...gqlValueOfFieldsOverriden,
  };

  Object.keys(gqlValueOrFieldsOverride).forEach((key) => {
    if (newObjMerge[key]) {
      newObjMerge[key] = deepMerge(
        gqlValueOrFieldsOverride[key],
        newObjMerge[key],
      );
    } else {
      newObjMerge[key] = gqlValueOrFieldsOverride[key];
    }
  });

  return newObjMerge;
}

export function flattenRawGQLValueOrFields(recievedFields: any) {
  if (!recievedFields) {
    return recievedFields;
  }
  // so first we extract the data content
  const output = {
    ...(recievedFields.DATA || {}),
  };
  // and then we loop for everything else, but data
  Object.keys(recievedFields).forEach((key) => {
    if (key !== "DATA") {
      output[key] = recievedFields[key];
    }
  });
  // return that
  return output;
}
