import { IPropertyDefinitionIncludedFileInfoType } from "./base/Root/Module/ItemDefinition/PropertyDefinition";
import { Stream } from "stream";
import FormDataNode from "form-data";
import fetchNode from "node-fetch";

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
      if (query.args) {
        return {
          ...query,
          args: this.findFilesAndProcessArgs(query.args),
        };
      }
      return query;
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
  private findFilesAndProcessArgs(arg: any): any {
    if (!arg || arg === null || typeof arg !== "object") {
      return arg;
    }

    if (
      (typeof File !== "undefined" && arg.src instanceof File) ||
      (Stream && arg.src instanceof Stream.Readable)
    ) {
      this.foundUnprocessedArgFiles.push(arg);
      return {
        ...arg,
        src: new GQLVar(arg.id),
      };
    }

    if (arg instanceof GQLEnum || arg instanceof GQLVar) {
      return arg;
    }

    if (Array.isArray(arg)) {
      return arg.map(this.findFilesAndProcessArgs);
    }

    const newResult = {};
    Object.keys(arg).forEach((argKey) => {
      newResult[argKey] = this.findFilesAndProcessArgs(arg[argKey]);
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
  args: any,
  keyOpenType: string,
  keyCloseType: string,
): string {
  if (typeof args !== "object" || args === null) {
    return JSON.stringify(args);
  }

  if (args instanceof GQLEnum || args instanceof GQLRaw) {
    return args.value;
  } else if (args instanceof GQLVar) {
    return "$" + args.value;
  } else if (Array.isArray(args)) {
    return "[" + args.map((arg) => buildArgs(arg, "{", "}")).join(",") + "]";
  }

  return keyOpenType + Object.keys(args).map((argKey) => {
    return argKey + ":" + buildArgs(args[argKey], "{", "}");
  }).join(",") + keyCloseType;
}

function buildGqlThing(type: string, mainArgs: any, ...queries: IGQLQueryObj[]) {
  let queryStr = type;
  if (Object.keys(mainArgs).length) {
    queryStr += buildArgs(mainArgs, "(", ")");
  }
  queryStr += "{";
  queries.forEach((q) => {
    queryStr += q.name;
    if (q.args && Object.keys(q.args).length) {
      queryStr += buildArgs(q.args, "(", ")");
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

export async function gqlQuery(query: GQLQuery, host: string = "") {
  const formData = typeof FormData !== "undefined" ? new FormData() : new FormDataNode();
  const operations = JSON.stringify(query.getOperations());
  formData.append("operations", operations);
  formData.append("map", JSON.stringify(query.getMap()));
  query.getAttachments().forEach((attachment) => {
    formData.append(attachment.id, attachment.src as File);
  });

  const fetchToUse = typeof fetch !== "undefined" ? fetch : fetchNode;

  if (typeof fetch === "undefined" && !host) {
    throw new Error("You must provide a host when using graphql querier outside of the browser, eg: http://mysite.com");
  }

  try {
    const value = await fetchToUse(host + "/graphql", {
      method: "POST",
      cache: "no-cache",
      body: formData as any,
    });
    return await value.json();
  } catch (err) {
    return null;
  }
}
