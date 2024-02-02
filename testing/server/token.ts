
import { Test } from "..";
import { strict as assert } from "assert";
import { IUserInfoAndTokensForTesting } from ".";
import { ENDPOINT_ERRORS } from "../../constants";
import { httpRequest } from "../../server/request";
import { EndpointErrorType } from "../../base/errors";

export class TokenTest extends Test {
  private testingUserInfo: IUserInfoAndTokensForTesting;
  private fullHost: string;

  constructor(fullHost: string, testingUserInfo: IUserInfoAndTokensForTesting) {
    super();

    this.fullHost = fullHost;
    this.testingUserInfo = testingUserInfo;
  }
  public describe() {
    this.it(
      "Should specify invalid credentials when no token specified",
      async () => {
        const url = new URL(this.fullHost);
        const response = await httpRequest<{error: EndpointErrorType}>({
          host: url.hostname,
          path: "/rest/user/token",
          isHttps: url.protocol.startsWith("https"),
          method: "POST",
          processAsJSON: true,
          noDebug: true,
          returnNonOk: true,
        });

        assert.strictEqual(response.response.statusCode, 403, "Did not return 403 Forbidden");
        
        if (!response?.data?.error?.code) {
          assert.fail("Did not return a formed error");
        }

        assert.strictEqual(
          response.data.error.code,
          ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          "Did not return code for " + ENDPOINT_ERRORS.INVALID_CREDENTIALS,
        );
      }
    );

    this.it(
      "Should provide the same token when a valid token is given",
      async () => {
        JSON.stringify(this.testingUserInfo.testToken)
        const url = new URL(this.fullHost);
        const response = await httpRequest<{token: string, id: string, role: string}>({
          host: url.hostname,
          path: "/rest/user/token",
          isHttps: url.protocol.startsWith("https"),
          method: "POST",
          processAsJSON: true,
          headers: {
            "Content-Type": "application/json",
            token: this.testingUserInfo.testToken,
          },
          noDebug: true,
        });

        assert.strictEqual(response.response.statusCode, 200, "Did not return 200 OK");

        if (
          !response.data.id ||
          !response.data.role ||
          !response.data.token
        ) {
          assert.fail("Malformed response");
        }

        assert.strictEqual(response.data.token, this.testingUserInfo.testToken);
      }
    );
  }
}