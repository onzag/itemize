import { IPropertyDefinitionIncludedFileInfoType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";

export class GQLQuery {
  private processedQueries: IGQLQueryObj[];
  private type: "query" | "mutation";
  private foundUnprocessedArgFiles: IPropertyDefinitionIncludedFileInfoType[];
  constructor(
    type: "query" | "mutation",
    queries: IGQLQueryObj[],
  ) {
    this.type = type;
    this.foundUnprocessedArgFiles = [];

    this.findFilesAndProcessArgs = this.findFilesAndProcessArgs.bind(this);

    this.processedQueries = queries.map((query) => {
      return this.findFilesAndProcessArgs(query.args);
    });
  }
  public getOperations() {
    return {
      query: buildGqlThing(this.type, this.getMainQueryArguments(), ...this.processedQueries),
      variables: this.getVariables(),
    };
  }
  public getMap() {
    const map: {[id: string]: [string]} = {};
    this.foundUnprocessedArgFiles.forEach((foundFile) => {
      map[foundFile.id] = ["variables." + foundFile.id];
    });
    return map;
  }
  public getAttachments(): IPropertyDefinitionIncludedFileInfoType[] {
    return this.foundUnprocessedArgFiles;
  }
  private getVariables() {
    const newVariables = {};
    this.foundUnprocessedArgFiles.forEach((foundFile) => {
      newVariables[foundFile.id] = null;
    });
    return newVariables;
  }
  private getMainQueryArguments() {
    const args = {};
    this.foundUnprocessedArgFiles.forEach((foundFile) => {
      args["$" + foundFile.id] = new GQLRaw("Upload!");
    });
    return args;
  }
  private findFilesAndProcessArgs(arg: any) {
    if (!arg || arg === null || typeof arg !== "object") {
      return arg;
    }

    if (arg.src instanceof File) {
      this.foundUnprocessedArgFiles.push(arg);
      return {
        ...arg,
        src: new GQLVar(arg.id),
      };
    }

    if (Array.isArray(arg)) {
      return arg.map(this.findFilesAndProcessArgs);
    }

    const newResult = {};
    Object.keys(arg).forEach((argKey) => {
      newResult[argKey] = this.findFilesAndProcessArgs(arg);
    });

    return newResult;
  }
}

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

export class GQLRaw {
  public value: string;
  constructor(value: string) {
    this.value = value;
  }
}

export class GQLVar {
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
      if (args[argKey] instanceof GQLEnum || args[argKey] instanceof GQLRaw) {
        argsStr += args[argKey].value;
      } else if (args[argKey] instanceof GQLVar) {
        argsStr += "$" + args[argKey].value;
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

function buildGqlThing(type: string, mainArgs: any, ...queries: IGQLQueryObj[]) {
  let queryStr = type;
  if (Object.keys(mainArgs).length) {
    queryStr += buildArgs(mainArgs, false);
  }
  queryStr += "{";
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
  return new GQLQuery("query", queries);
}

export function buildGqlMutation(...mutations: IGQLQueryObj[]) {
  return new GQLQuery("mutation", mutations);
}

// TODO implement timeouts
export async function gqlQuery(query: GQLQuery) {
  const formData = new FormData();
  const operations = JSON.stringify(query.getOperations());
  formData.append("operations", operations);
  formData.append("map", JSON.stringify(query.getMap()));
  query.getAttachments().forEach((attachment) => {
    formData.append(attachment.id, attachment.src);
  });
  const value = await fetch("/graphql", {
    method: "POST",
    cache: "no-cache",
    body: formData,
  });

  try {
    return await value.json();
  } catch (err) {
    return null;
  }
}
