import { logger } from "../../server/logger";
import { IAppDataType } from "../../server";
import USSDProvider from "./base/USSDProvider";

export class FakeUSSDService extends USSDProvider<null> {
  public getRouter(appData: IAppDataType) {
    const router = this.expressRouter();

    router.get("/ussd", (req, res) => {
      res.setHeader("content-type", "text/html; charset=utf-8");

      const stdCountry = this.localAppData.config.fallbackCountryCode;
      const stdCurrency = this.localAppData.config.fallbackCurrency;
      const stdLanguage = this.localAppData.config.fallbackLanguage;

      res.status(200).end(
        `<!DOCTYPE html>
<html>
<head>
<title>USSD Emulator</title>
<style>
#response {
  display: block;
  padding: 1rem 0;
}
</style>
</head>
<body>
  <div id="sessionbox">
    <input type="text" placeholder="user international phone number without spaces" id="phone"/>
    <input type="text" placeholder="country code" value="${stdCountry}" id="country"/>
    <input type="text" placeholder="currency code" value="${stdCurrency}" id="currency"/>
    <input type="text" placeholder="language code" value="${stdLanguage}" id="lang"/>
  </div>

  <button id="start">start session</button>
  <button id="end" style="display:none">end session</button>

  <code id="response" style="display:none"></code>

  <input id="input" type="text" placeholder="ussd input" style="display:none" />
  <button id="send" style="display:none">send message</button>

  <script>
    const phoneObj = document.querySelector("#phone");
    const countryObj = document.querySelector("#country");
    const currencyObj = document.querySelector("#currency");
    const langObj = document.querySelector("#lang");
    const startObj = document.querySelector("#start");
    const endObj = document.querySelector("#end");
    const responseObj = document.querySelector("#response");
    const sendObj = document.querySelector("#send");
    const inputObj = document.querySelector("#input");

    function getQuery() {
      return "?country=" + countryObj.value + "&currency=" + currencyObj.value + "&language=" + langObj.value; 
    }

    startObj.addEventListener("click", async () => {
      const queryObj = "/rest/service/ussd/" + encodeURIComponent(phoneObj.value) + getQuery();

      const rs = await (await fetch(queryObj)).text();

      phoneObj.style.display = "none";
      countryObj.style.display = "none";
      currencyObj.style.display = "none";
      langObj.style.display = "none";
      startObj.style.display = "none";

      responseObj.style.display = "";
      inputObj.style.display = "";
      endObj.style.display = "";
      sendObj.style.display = "";
      inputObj.value = "";

      responseObj.innerText = rs;
    });

    sendObj.addEventListener("click", async () => {
      const input = inputObj.value;
      inputObj.value = "";

      const queryObj = "/rest/service/ussd/" + encodeURIComponent(phoneObj.value) + getQuery() + "&input=" + encodeURIComponent(input);
      const rs = await (await fetch(queryObj)).text();
      responseObj.innerText = rs;
    });

    endObj.addEventListener("click", async () => {
      inputObj.value = "";

      const queryObj = "/rest/service/ussd/" + encodeURIComponent(phoneObj.value) + getQuery() + "&end=t";
      const rs = await (await fetch(queryObj)).text();
      
      responseObj.innerText = "";
  
      phoneObj.style.display = "";
      countryObj.style.display = "";
      currencyObj.style.display = "";
      langObj.style.display = "";
      startObj.style.display = "";

      responseObj.style.display = "none";
      inputObj.style.display = "none";
      endObj.style.display = "none";
      sendObj.style.display = "none";
      inputObj.value = "none";
    })
  </script>
</body>
</html>
        `
      );
    });

    router.get("/ussd/:phone", async (req, res) => {
      res.setHeader("content-type", "text/plain; charset=utf-8");

      const input = req.query.input as string;
      const country = req.query.country as string;
      const language = req.query.language as string;
      const currency = req.query.currency as string;
      const end = req.query.end as string;

      let rs = "";
      let status = 200;
      if (end === "t") {
        try {
          await this.endSession(req.params.phone);
        } catch (err) {
          logger.error("fake-ussd [SERIOUS]: Could not end USSD session", {
            errMessage: err.message,
            errStack: err.stack,
          });
        }
      } else if (this.hasSession(req.params.phone)) {
        try {
          rs = (await this.continueSession(req.params.phone, country, language, currency, input)).message;
        } catch (err) {
          logger.error("fake-ussd [SERIOUS]: Could not return USSD response", {
            errMessage: err.message,
            errStack: err.stack,
          });
          status = 500;
          rs = (this.localAppData.root.getI18nDataFor(language) || this.localAppData.root.getI18nDataFor("en")).error.INTERNAL_SERVER_ERROR;
        }
      } else {
        try {
          rs = (await this.startSession(req.params.phone, country, language, currency)).message;
        } catch (err) {
          logger.error("fake-ussd [SERIOUS]: Could not return USSD response", {
            errMessage: err.message,
            errStack: err.stack,
          });
          status = 500;
          rs = (this.localAppData.root.getI18nDataFor(language) || this.localAppData.root.getI18nDataFor("en")).error.INTERNAL_SERVER_ERROR;
        }
      }

      res.status(status).end(rs);
    });

    return router;
  }
}