export interface IGQLQueryObj {
  name: string;
  args?: {
    [key: string]: any;
  };
  fields?: {
    [key: string]: any;
  };
}

export class GQLEnum {
  public value: string;
  constructor(value: string) {
    this.value = value;
  }
}

function buildFields(fields: {
  [key: string]: any;
}) {
  let fieldsStr = "{";
  Object.keys(fields).forEach((fieldKey) => {
    fieldsStr += fieldKey;
    if (Object.keys(fields[fieldKey]).length) {
      fieldsStr += buildFields(fields[fieldKey]);
    }
    fieldsStr += ",";
  });
  fieldsStr += "}";
  return fieldsStr;
}

function buildArgs(
  args: {
    [key: string]: any;
  },
  keyType: boolean,
) {
  let argsStr = keyType ? "{" : "(";
  Object.keys(args).forEach((argKey) => {
    argsStr += argKey + ":";
    if (typeof (args[argKey]) === "object" && args[argKey] !== null) {
      if (args[argKey] instanceof GQLEnum) {
        argsStr += args[argKey].value;
      } else {
        argsStr += buildArgs(args[argKey], true);
      }
    } else {
      argsStr += JSON.stringify(args[argKey]);
    }
    argsStr += ",";
  });
  argsStr += keyType ? "}" : ")";
  return argsStr;
}

function buildGqlThing(type: string, ...queries: IGQLQueryObj[]) {
  let queryStr = type + "{";
  queries.forEach((q) => {
    queryStr += q.name;
    if (q.args && Object.keys(q.args).length) {
      queryStr += buildArgs(q.args, false);
    }
    if (q.fields && Object.keys(q.fields).length) {
      queryStr += buildFields(q.fields);
    } else {
      queryStr += ";";
    }
  });
  queryStr += "}";
  return queryStr;
}

export function buildGqlQuery(...queries: IGQLQueryObj[]) {
  return buildGqlThing("query", ...queries);
}

export function buildGqlMutation(...mutations: IGQLQueryObj[]) {
  return buildGqlThing("mutation", ...mutations);
}

// TODO implement timeouts
export async function gqlQuery(query: string) {
  console.log(query);
  const value = await fetch("/graphql", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  try {
    return await value.json();
  } catch (err) {
    return null;
  }
}
