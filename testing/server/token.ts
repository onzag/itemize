
import { Test } from "..";
import { strict as assert } from "assert";
import { IUserInfoAndTokensForTesting } from ".";
import { ENDPOINT_ERRORS } from "../../constants";

export class TokenTest extends Test {
  private testingUserInfo: IUserInfoAndTokensForTesting;
  private fullHost: string;

  constructor(fullHost: string, testingUserInfo: IUserInfoAndTokensForTesting) {
    super();

    this.fullHost = fullHost;
    this.testingUserInfo = testingUserInfo;
  }
  public describe() {
  //   this.it(
  //     "Should specify invalid credentials when no token specified",
  //     async () => {
  //       const response = await fetchNode(this.fullHost + "/graphql", {
  //         method: "POST",
  //         body: JSON.stringify({ query: "query{token{token,}}", variables: null }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       assert.strictEqual(response.status, 200, "Did not return 200 OK");

  //       const gqlAnswer = await response.json();

  //       if (
  //         !gqlAnswer.errors ||
  //         !gqlAnswer.errors[0] ||
  //         !gqlAnswer.errors[0].error ||
  //         gqlAnswer.errors[0].error.code !== ENDPOINT_ERRORS.INVALID_CREDENTIALS
  //       ) {
  //         assert.fail("Did not return code for " + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
  //       }

  //       assert.strictEqual(gqlAnswer.data.token, null);
  //     }
  //   );

  //   this.it(
  //     "Should provide the same token when a valid token is given",
  //     async () => {
  //       const response = await fetchNode(this.fullHost + "/graphql", {
  //         method: "POST",
  //         body: JSON.stringify({ query: "query{token(token: " + JSON.stringify(this.testingUserInfo.testToken) + "){token,}}", variables: null }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       assert.strictEqual(response.status, 200, "Did not return 200 OK");

  //       const gqlAnswer = await response.json();

  //       if (
  //         gqlAnswer.errors
  //       ) {
  //         if (gqlAnswer.errors[0] && gqlAnswer.errors[0].error && gqlAnswer.errors[0].error.code) {
  //           assert.fail("Did not provide the same token but rather gave error code " + gqlAnswer.errors[0].error.code);
  //         }
  //         assert.fail("Provided an error without code");
  //       }

  //       assert.strictEqual(gqlAnswer.data.token.token, this.testingUserInfo.testToken);
  //     }
  //   );

  //   this.it(
  //     "Should allow a graphql action when using the valid token",
  //     async () => {
  //       const response = await fetchNode(this.fullHost + "/graphql", {
  //         method: "POST",
  //         body: JSON.stringify(
  //           {
  //             query:
  //               "mutation{EDIT_MOD_users__IDEF_user(token: " +
  //               JSON.stringify(this.testingUserInfo.testToken) +
  //               ",id:" +
  //               JSON.stringify(this.testingUserInfo.testUser.id) +
  //               ",version:null,language:" +
  //               JSON.stringify(this.testingUserInfo.testUser.app_language) +
  //               ",listener_uuid:null){id,}}",
  //             variables: null
  //           }
  //         ),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       assert.strictEqual(response.status, 200, "Did not return 200 OK");

  //       const gqlAnswer = await response.json();

  //       if (
  //         !gqlAnswer.errors ||
  //         !gqlAnswer.errors[0] ||
  //         !gqlAnswer.errors[0].error ||
  //         gqlAnswer.errors[0].error.code !== ENDPOINT_ERRORS.NOTHING_TO_UPDATE
  //       ) {
  //         assert.fail("Did not return code for " + ENDPOINT_ERRORS.NOTHING_TO_UPDATE);
  //       }
  //     }
  //   );

  //   const otherTests = [
  //     {
  //       label: "Should detect malformed tokens",
  //       token: this.testingUserInfo.malformedTestToken,
  //     },
  //     {
  //       label: "Should detect tokens signed with the wrong key",
  //       token: this.testingUserInfo.invalidSignatureTestToken,
  //     },
  //     {
  //       label: "Should not validate against expired tokens via user action",
  //       token: this.testingUserInfo.invalidSessionIdTestToken,
  //     },
  //     {
  //       label: "Should detect role forgery",
  //       token: this.testingUserInfo.invalidRoleTestToken
  //     },
  //     {
  //       label: "Should detect totally made up tokens",
  //       token: this.testingUserInfo.garbageMadeUpToken
  //     },
  //   ];

  //   otherTests.forEach((t) => {
  //     this.it(
  //       t.label,
  //       async () => {
  //         const response = await fetchNode(this.fullHost + "/graphql", {
  //           method: "POST",
  //           body: JSON.stringify({ query: "query{token(token: " + JSON.stringify(t.token) + "){token,}}", variables: null }),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  
  //         assert.strictEqual(response.status, 200, "Did not return 200 OK");
  
  //         const gqlAnswer = await response.json();
  
  //         if (
  //           !gqlAnswer.errors ||
  //           !gqlAnswer.errors[0] ||
  //           !gqlAnswer.errors[0].error ||
  //           gqlAnswer.errors[0].error.code !== ENDPOINT_ERRORS.INVALID_CREDENTIALS
  //         ) {
  //           assert.fail("Did not return code for " + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
  //         }
  
  //         assert.strictEqual(gqlAnswer.data.token, null);
  //       }
  //     );

  //     this.it(
  //       t.label + " during a graphql action",
  //       async () => {
  //         const response = await fetchNode(this.fullHost + "/graphql", {
  //           method: "POST",
  //           body: JSON.stringify(
  //             {
  //               query:
  //                 "mutation{EDIT_MOD_users__IDEF_user(token: " +
  //                 JSON.stringify(t.token) +
  //                 ",id:" +
  //                 JSON.stringify(this.testingUserInfo.testUser.id) +
  //                 ",version:null,language:" +
  //                 JSON.stringify(this.testingUserInfo.testUser.app_language) +
  //                 ",listener_uuid:null){id,}}",
  //               variables: null
  //             }
  //           ),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  
  //         assert.strictEqual(response.status, 200, "Did not return 200 OK");
  
  //         const gqlAnswer = await response.json();
  
  //         if (
  //           !gqlAnswer.errors ||
  //           !gqlAnswer.errors[0] ||
  //           !gqlAnswer.errors[0].error ||
  //           gqlAnswer.errors[0].error.code !== ENDPOINT_ERRORS.INVALID_CREDENTIALS
  //         ) {
  //           console.log(gqlAnswer);
  //           assert.fail("Did not return code for " + ENDPOINT_ERRORS.INVALID_CREDENTIALS);
  //         }
  //       }
  //     );
  //   });
  }
}