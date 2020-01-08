import { buildGqlQuery, gqlQuery, buildGqlMutation } from "../itemize/gql-querier";

const host = "http://cyclingexchangehub.com";
const sensorId = parseInt(process.argv[2], 10);
const securityCode = process.argv[3];

(async () => {
  console.log("Attempting to initialize sensor for id", sensorId, "with security code", securityCode);
  if (isNaN(sensorId)) {
    console.log("failed");
    return;
  }

  const tokenQuery = buildGqlQuery({
    name: "sensor_token",
    fields: {
      token: {},
    },
  });

  const tokenValue = (await gqlQuery(tokenQuery, host)).data.sensor_token.token;

  setInterval(async () => {
    const queryForSensor = buildGqlMutation({
      name: "EDIT_MOD_test__MOD_sensors__IDEF_temperature",
      args: {
        token: tokenValue,
        language: "en",
        id: sensorId,
        POLICY_EDIT_REQUIRES_SECURITY_CODE_security_code: securityCode,
        POLICY_READ_REQUIRES_SECURITY_CODE_security_code: securityCode,
        // generate random number and crop to two decimal places, itemize doesn't support too many decimals
        temperature: Math.floor((20 + ((Math.random() * 6) + 1)) * 100) / 100,
      },
      fields: {
        id: {},
      },
    });
    const result = await gqlQuery(queryForSensor, host);
    console.log(JSON.stringify(result, null, 2));
  }, 3000);
})();
