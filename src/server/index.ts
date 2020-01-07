import { initializeServer } from "../../itemize/server";

initializeServer({
  customTokenGQLQueries: {
    sensor_token: {
      resolve() {
        return {
          withRole: "SENSOR",
        };
      },
    },
  },
});
