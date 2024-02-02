import { Test } from "..";
import { strict as assert } from "assert";
import { ITestingInfoType } from "../itemize";
import Module from "../../base/Root/Module";
import { PREFIX_ADD, PREFIX_DELETE, PREFIX_EDIT, PREFIX_GET, PREFIX_GET_LIST, PREFIX_SEARCH, PREFIX_TRADITIONAL_SEARCH } from "../../constants";
import { httpRequest } from "../../server/request";
import { RQRootSchema, getRQSchemaForRoot } from "../../base/Root/rq";

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
  private rqRootSchema: RQRootSchema;

  constructor(fullHost: string, testingInfo: ITestingInfoType, mod: Module, rootSchema: RQRootSchema) {
    super();

    this.fullHost = fullHost;
    this.testingInfo = testingInfo;
    this.mod = mod;
    this.rqRootSchema = rootSchema;
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
            const foundGetListEndpoint = this.rqRootSchema.query[endpoint];
            if (!foundGetListEndpoint) {
              assert.fail("Did not find a query endpoint for " + endpoint);
            }
          });
        }
      );
    }

    idefs.forEach((idef) => {
      this.it(
        "Should have a GET/ADD/EDIT/DELETE rq endpoint for " + idef.getPath(),
        () => {
          const endpoint = PREFIX_GET + idef.getQualifiedPathName();
          const foundField = this.rqRootSchema.query[endpoint];
          if (!foundField) {
            assert.fail("Did not find a query endpoint for " + endpoint);
          }

          const addEndpoint = PREFIX_ADD + idef.getQualifiedPathName();
          const editEndpoint = PREFIX_EDIT + idef.getQualifiedPathName();
          const deleteEndpoint = PREFIX_DELETE + idef.getQualifiedPathName();

          [addEndpoint, editEndpoint, deleteEndpoint].forEach((endpoint) => {
            const foundGetListEndpoint = this.rqRootSchema.mutation[endpoint];
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
              const foundGetListEndpoint = this.rqRootSchema.query[endpoint];
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
        new ModuleTest(this.fullHost, this.testingInfo, mod, this.rqRootSchema),
      );
    });
  }
}

export class RQTest extends Test {
  private testingInfo: ITestingInfoType;
  private fullHost: string;

  constructor(fullHost: string, testingInfo: ITestingInfoType) {
    super();

    this.fullHost = fullHost;
    this.testingInfo = testingInfo;
  }
  public describe() {
    const rootSchema = JSON.parse(JSON.stringify(getRQSchemaForRoot(this.testingInfo.root)));

    this.it(
      "Should have a rq endpoint",
      async () => {
        const urlParsed = new URL(this.fullHost);
        const response = await httpRequest({
          host: urlParsed.hostname,
          path: "/rq",
          method: "GET",
          isHttps: urlParsed.protocol.startsWith("https"),
          processAsJSON: true,
          port: urlParsed.port,
          noDebug: true,
        });

        assert.strictEqual(response.response.statusCode, 200, "Did not return 200 OK");

        this.it(
          "Should provide a schema equivalent to what is calculated in the client side",
          () => {
            assert.deepEqual(response.data, rootSchema, "Did not equal the root schema");
          }
        );
      }
    ).skipAllOnFail();

    this.testingInfo.root.getAllModules().forEach((m) => {
      this.define(
        "Module tests for " + m.getPath(),
        new ModuleTest(this.fullHost, this.testingInfo, m, rootSchema),
      );
    });
  }
}