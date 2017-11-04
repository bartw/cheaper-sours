const scraper = require("./scraper.js");
const logger = require("./logger");

const getLinks = async page => {
  const houses = await page.$$("#list-canvas article.photo-card > a");
  return await Promise.all(
    houses.map(async h => await page.evaluate(el => el.href, h))
  );
};

const getUrl = async (page, selector) => {
  const element = await page.$(selector);
  if (element) {
    return await page.evaluate(el => el.href, element);
  }
  return null;
};

const scrapeLinks = async url => {
  const page = await scraper.initPage();
  await page.goto(url);
  logger.log("get links from " + url);
  const links = await getLinks(page);
  const nextPage = await getUrl(page, "a.hsr-pagination-next");
  await scraper.dispose();
  return {
    links: links,
    nextPage: nextPage
  };
};

const retryScrapeLinks = async url => {
  var maxRetries = 5;
  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      return await scrapeLinks(url);
    } catch (error) {
      logger.log(
        "attempt " + (retries + 1) + " to scrape links from " + url + " failed"
      );
      if (retries >= maxRetries - 1) {
        throw error;
      }
    }
  }
};

const scrape = async url => {
  let links = [];
  do {
    const result = await retryScrapeLinks(url);
    links = links.concat(result.links);
    url = result.nextPage;
  } while (url);
  logger.log("scraped " + links.length + " links");
  return links;
};

const linkScraper = {
  scrape: scrape
};

module.exports = linkScraper;
