const scraper = require("./scraper.js");
const linkScraper = require("./linkScraper.js");
const dataScraper = require("./dataScraper.js");
const cleaner = require("./cleaner.js");
const enricher = require("./enricher.js");

const bar = async baseUrl => {
  try {
    const suffix = "zoeken/maastricht/op_termijn/50000-500000_prijs/list_view";
    const url = baseUrl + suffix;
    const page = await scraper.initPage();
    const links = await linkScraper.retryScrapeLinks(page, url);
    const data = await dataScraper.retryScrapeData(page, links);
    await scraper.dispose();
    const cleanData = cleaner.clean(data);
    const enrichedData = enricher.enrich(cleanData);
    return enrichedData;
  } catch (error) {
    console.log(error);
  }
};

const foo = {
  bar: bar
};

module.exports = foo;