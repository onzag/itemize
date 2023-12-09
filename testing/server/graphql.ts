import { Test } from "..";
import { strict as assert } from "assert";
import FormDataNode from "form-data";
import { ITestingInfoType } from "../itemize";
import Module from "../../base/Root/Module";
import { PREFIX_ADD, PREFIX_DELETE, PREFIX_EDIT, PREFIX_GET, PREFIX_GET_LIST, PREFIX_SEARCH, PREFIX_TRADITIONAL_SEARCH } from "../../constants";

type ISchemaFields = Array<{ name: string }>;
interface IAllSchemaFields {
  query: ISchemaFields,
  mutation: ISchemaFields,
}
type ISchemaFieldsGetterFn = () => IAllSchemaFields;

class ModuleTest extends Test {
  private testingInfo: ITestingInfoType;
  private fullHost: string;
  private mod: Module;
  private getSchemaFields: ISchemaFieldsGetterFn;

  constructor(fullHost: string, testingInfo: ITestingInfoType, mod: Module, getSchemaFields: ISchemaFieldsGetterFn) {
    super();

    this.fullHost = fullHost;
    this.testingInfo = testingInfo;
    this.mod = mod;
    this.getSchemaFields = getSchemaFields;
  }

  public describe() {
    const idefs = this.mod.getAllChildDefinitionsRecursive();
    const modchild = this.mod.getAllModules();

    if (this.mod.isSearchable()) {
      this.it(
        "Should have module level for all 3 GET_LIST/SEARCH/TSEARCH",
        () => {
          const getListEndpoint = PREFIX_GET_LIST + this.mod.getQualifiedPathName();
          const searchEndpoint = PREFIX_SEARCH + this.mod.getQualifiedPathName();
          const tsearchEndpoint = PREFIX_TRADITIONAL_SEARCH + this.mod.getQualifiedPathName();

          [getListEndpoint, searchEndpoint, tsearchEndpoint].forEach((endpoint) => {
            const foundGetListEndpoint = this.getSchemaFields().query.some((f) => f.name === endpoint);
            if (!foundGetListEndpoint) {
              assert.fail("Did not find a query endpoint for " + endpoint);
            }
          });
        }
      );
    }

    idefs.forEach((idef) => {
      this.it(
        "Should have a GET/ADD/EDIT/DELETE graphql endpoint for " + idef.getPath(),
        () => {
          const endpoint = PREFIX_GET + idef.getQualifiedPathName();
          const foundField = this.getSchemaFields().query.some((f) => f.name === endpoint);
          if (!foundField) {
            assert.fail("Did not find a query endpoint for " + endpoint);
          }

          const addEndpoint = PREFIX_ADD + idef.getQualifiedPathName();
          const editEndpoint = PREFIX_EDIT + idef.getQualifiedPathName();
          const deleteEndpoint = PREFIX_DELETE + idef.getQualifiedPathName();

          [addEndpoint, editEndpoint, deleteEndpoint].forEach((endpoint) => {
            const foundGetListEndpoint = this.getSchemaFields().mutation.some((f) => f.name === endpoint);
            if (!foundGetListEndpoint) {
              assert.fail("Did not find a mutation endpoint for " + endpoint);
            }
          });
        }
      );

      if (idef.isSearchable()) {
        this.it(
          "Should have all 3 GET_LIST/SEARCH/TSEARCH endpoints for " + idef.getPath(),
          () => {
            const getListEndpoint = PREFIX_GET_LIST + idef.getQualifiedPathName();
            const searchEndpoint = PREFIX_SEARCH + idef.getQualifiedPathName();
            const tsearchEndpoint = PREFIX_TRADITIONAL_SEARCH + idef.getQualifiedPathName();

            [getListEndpoint, searchEndpoint, tsearchEndpoint].forEach((endpoint) => {
              const foundGetListEndpoint = this.getSchemaFields().query.some((f) => f.name === endpoint);
              if (!foundGetListEndpoint) {
                assert.fail("Did not find a query endpoint for " + endpoint);
              }
            });
          }
        );
      };
    });

    modchild.forEach((mod) => {
      this.define(
        "Module tests for " + mod.getPath(),
        new ModuleTest(this.fullHost, this.testingInfo, mod, this.getSchemaFields),
      );
    });
  }
}

export class GraphqlTest extends Test {
  private testingInfo: ITestingInfoType;
  private fullHost: string;

  constructor(fullHost: string, testingInfo: ITestingInfoType) {
    super();

    this.fullHost = fullHost;
    this.testingInfo = testingInfo;
  }
  public describe() {
    let schemaFields: ISchemaFields = null;
    let schemaMutationFields: ISchemaFields = null;

    // this.it(
    //   "Should have a graphql endpoint",
    //   async () => {
    //     const response = await fetchNode(this.fullHost + "/graphql", {
    //       method: "POST",
    //       body: JSON.stringify({ query: "query{__schema{queryType{name}}}", variables: null }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     assert.strictEqual(response.status, 200, "Did not return 200 OK");

    //     const gqlAnswer = await response.json();

    //     assert.deepStrictEqual(gqlAnswer, {
    //       data: {
    //         __schema: {
    //           queryType: {
    //             name: "ROOT_QUERY",
    //           },
    //         },
    //       },
    //     }, "Did not return a ROOT_QUERY");
    //   }
    // );

    // this.it(
    //   "Should support formdata protocol in graphql",
    //   async () => {

    //     // building the form data
    //     const formData = new FormDataNode();
    //     // append this stuff to the form data
    //     formData.append("operations", JSON.stringify({ query: "query{__schema{queryType{name}}}", variables: null }));
    //     formData.append("map", "{}");

    //     const response = await fetchNode(this.fullHost + "/graphql", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     assert.strictEqual(response.status, 200, "Did not return 200 OK");

    //     const gqlAnswer = await response.json();

    //     assert.deepStrictEqual(gqlAnswer, {
    //       data: {
    //         __schema: {
    //           queryType: {
    //             name: "ROOT_QUERY",
    //           },
    //         },
    //       },
    //     }, "Did not return a ROOT_QUERY");
    //   }
    // );

    // this.it(
    //   "Should return all supported schema query and mutation fields",
    //   async () => {
    //     const schemaQuery = "query {__schema {queryType{fields {name}}mutationType{fields {name}}}}";
    //     const response = await fetchNode(this.fullHost + "/graphql", {
    //       method: "POST",
    //       body: JSON.stringify({ query: schemaQuery, variables: null }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     assert.strictEqual(response.status, 200, "Did not return 200 OK");

    //     const gqlAnswer = await response.json();

    //     schemaFields = gqlAnswer.data.__schema.queryType.fields;
    //     schemaMutationFields = gqlAnswer.data.__schema.mutationType.fields;

    //     if (!Array.isArray(schemaFields)) {
    //       assert.fail("Schema query fields were not an array");
    //     }

    //     if (!Array.isArray(schemaMutationFields)) {
    //       assert.fail("Schema mutation fields were not an array");
    //     }
    //   }
    // ).skipLayerOnFail();

    // this.it(
    //   "Should have a token endpoint",
    //   () => {
    //     const foundField = schemaFields.some((f) => f.name === "token");
    //     if (!foundField) {
    //       assert.fail("Did not find a query endpoint for the token");
    //     }
    //   }
    // );

    const getSchemaFields: ISchemaFieldsGetterFn = () => {
      return {
        query: schemaFields,
        mutation: schemaMutationFields,
      };
    }

    this.testingInfo.root.getAllModules().forEach((m) => {
      this.define(
        "Module tests for " + m.getPath(),
        new ModuleTest(this.fullHost, this.testingInfo, m, getSchemaFields),
      );
    });
  }
}