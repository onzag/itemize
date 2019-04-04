let fs = require("fs");

const countriesCSVData = JSON.parse(fs.readFileSync("./countries.csv.json", "utf-8"));
const countriesData = JSON.parse(fs.readFileSync("./countries.json", "utf-8"));
const countries2CSVData = JSON.parse(fs.readFileSync("./countries2.csv.json", "utf-8"));

const result = {};
Object.keys(countriesData).forEach((countryCode) => {
  const value = countriesData[countryCode];
  let csvData = countriesCSVData.find(c => c.country === countryCode);
  if (!csvData) {
    csvData = countries2CSVData.find(c => c.CountryCode === countryCode);
  }

  if (countryCode === "BQ") {
    csvData = {
      longitude: -68.262383,
      latitude: 12.201890
    }
  }
  
  result[countryCode] = {
    ...value,
    latitude: csvData.latitude || csvData.CapitalLatitude,
    longitude: csvData.longitude || csvData.CapitalLongitude,
  }
});

fs.writeFileSync("../countries.json", JSON.stringify(result), "utf8");