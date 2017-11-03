const linkScraper = require("./linkScraper.js");
const dataScraper = require("./dataScraper.js");
const cleaner = require("./cleaner.js");
const enricher = require("./enricher.js");
const json2xls = require("json2xls");

const bar = async baseUrl => {
  try {
    const suffix = "zoeken/maastricht/op_termijn/50000-500000_prijs/list_view";
    const url = baseUrl + suffix;
    const links = await linkScraper.retryScrapeLinks(url);
    const data = await dataScraper.retryScrapeData(links);
    const cleanData = cleaner.clean(data);
    const enrichedData = enricher.enrich(cleanData);
    const xls = json2xls(enrichedData);
    return xls;
  } catch (error) {
    console.log(error);
  }
};

const foo = {
  bar: bar
};

module.exports = foo;
