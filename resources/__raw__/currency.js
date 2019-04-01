let fs = require("fs");

const currencyCSVData = JSON.parse(fs.readFileSync("./currency.csv.json", "utf-8"));
const currencyData = JSON.parse(fs.readFileSync("./currency.json", "utf-8"));

// The CSV data is more comprehensive so we use that one

const result = {};
currencyCSVData.filter(row => row.Language === "EN").forEach(row => {
  result[row.CurrencyISO] = {
    code: row.CurrencyISO,
    name: row.Money,
    symbol: row.Symbol,
    rounding: currencyData[row.CurrencyISO] ? currencyData[row.CurrencyISO].rounding : 0,
    decimals: currencyData[row.CurrencyISO] ? currencyData[row.CurrencyISO].decimal_digits : 2,
  }
});

fs.writeFileSync("../currency.json", JSON.stringify(result), "utf8");