import fetchNode from "node-fetch";
import { Test } from "..";
import { strict as assert } from "assert";
import FormDataNode from "form-data";
import { ITestingInfoType } from "../itemize";
import Module from "../../base/Root/Module";
import { PREFIX_GET, PREFIX_GET_LIST, PREFIX_SEARCH, PREFIX_TRADITIONAL_SEARCH } from "../../constants";

type ISchemaFields = Array<{ name: string }>;

class ModuleTest extends Test {
  private info: ITestingInfoType;
  private fullHost: string;
  private mod: Module;
  private getSchemaFields: () => ISchemaFields;

  constructor(fullHost: string, info: ITestingInfoType, mod: Module, getSchemaFields: () => ISchemaFields) {
    super();

    this.fullHost = fullHost;
    this.info = info;
    this.mod = mod;
    this.getSchemaFields = getSchemaFields;
  }

  public describe() {
    const idefs = this.mod.getAllChildDefinitionsRecursive();
    const modchild = this.mod.getAllModules();

    if (this.mod.isSearchable()) {
      this.it(
        "Should have module level for all 3 GET_LIST, SEARCH and TSEARCH",
        () => {
          const getListEndpoint = PREFIX_GET_LIST + this.mod.getQualifiedPathName();
          const searchEndpoint = PREFIX_SEARCH + this.mod.getSearchModule().getQualifiedPathName();
          const tsearchEndpoint = PREFIX_TRADITIONAL_SEARCH + this.mod.getSearchModule().getQualifiedPathName();

          [getListEndpoint, searchEndpoint, tsearchEndpoint].forEach((endpoint) => {
            const foundGetListEndpoint = this.getSchemaFields().some((f) => f.name === endpoint);
            if (!foundGetListEndpoint) {
              assert.fail("Did not find an endpoint for " + endpoint);
            }
          });
        }
      );
    }

    idefs.forEach((idef) => {
      this.it(
        "Should have a GET graphql endpoint for " + idef.getPath(),
        () => {
          const endpoint = PREFIX_GET + idef.getQualifiedPathName();
          const foundField = this.getSchemaFields().some((f) => f.name === endpoint);
          if (!foundField) {
            assert.fail("Did not find an endpoint for " + endpoint);
          }
        }
      );

      if (idef.isSearchable()) {
        this.it(
          "Should have all 3 GET_LIST, SEARCH and TSEARCH endpoints for " + idef.getPath(),
          () => {
            const getListEndpoint = PREFIX_GET_LIST + idef.getQualifiedPathName();
            const searchEndpoint = PREFIX_SEARCH + idef.getSearchModeCounterpart().getQualifiedPathName();
            const tsearchEndpoint = PREFIX_TRADITIONAL_SEARCH + idef.getSearchModeCounterpart().getQualifiedPathName();

            [getListEndpoint, searchEndpoint, tsearchEndpoint].forEach((endpoint) => {
              const foundGetListEndpoint = this.getSchemaFields().some((f) => f.name === endpoint);
              if (!foundGetListEndpoint) {
                assert.fail("Did not find an endpoint for " + endpoint);
              }
            });
          }
        );
      };
    });

    modchild.forEach((mod) => {
      this.define(
        "Module tests for " + mod.getPath(),
        new ModuleTest(this.fullHost, this.info, mod, this.getSchemaFields),
      );
    });
  }
}

export class GraphqlTest extends Test {
  private info: ITestingInfoType;
  private fullHost: string;

  constructor(fullHost: string, info: ITestingInfoType) {
    super();

    this.fullHost = fullHost;
    this.info = info;
  }
  public describe() {
    let shemaFields: ISchemaFields = null;

    this.it(
      "Should have a graphql endpoint",
      async () => {
        const response = await fetchNode(this.fullHost + "/graphql", {
          method: "POST",
          body: JSON.stringify({ query: "query{__schema{queryType{name}}}", variables: null }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        const gqlAnswer = await response.json();

        assert.deepStrictEqual(gqlAnswer, {
          data: {
            __schema: {
              queryType: {
                name: "ROOT_QUERY",
              },
            },
          },
        }, "Did not return a ROOT_QUERY");
      }
    );

    this.it(
      "Should support formdata protocol in graphql",
      async () => {

        // building the form data
        const formData = new FormDataNode();
        // append this stuff to the form data
        formData.append("operations", JSON.stringify({ query: "query{__schema{queryType{name}}}", variables: null }));
        formData.append("map", "{}");

        const response = await fetchNode(this.fullHost + "/graphql", {
          method: "POST",
          body: formData,
        });

        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        const gqlAnswer = await response.json();

        assert.deepStrictEqual(gqlAnswer, {
          data: {
            __schema: {
              queryType: {
                name: "ROOT_QUERY",
              },
            },
          },
        }, "Did not return a ROOT_QUERY");
      }
    );

    this.it(
      "Should return all supported schema query fields",
      async () => {
        const schemaQuery = "query {__schema {queryType{fields {name}}}}";
        const response = await fetchNode(this.fullHost + "/graphql", {
          method: "POST",
          body: JSON.stringify({ query: schemaQuery, variables: null }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        assert.strictEqual(response.status, 200, "Did not return 200 OK");

        const gqlAnswer = await response.json();

        shemaFields = gqlAnswer.data.__schema.queryType.fields;

        if (!Array.isArray(shemaFields)) {
          assert.fail("Schema fields were not an array");
        }
      }
    ).skipLayerOnFail();

    const getSchemaFields = () => {
      return shemaFields;
    }

    this.info.root.getAllModules().forEach((m) => {
      this.define(
        "Module tests for " + m.getPath(),
        new ModuleTest(this.fullHost, this.info, m, getSchemaFields),
      );
    });
  }
}