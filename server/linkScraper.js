const scraper = require("./scraper.js");

const getLinks = async page => {
  const houses = await page.$$("#list-canvas article.photo-card > a");
  return await Promise.all(
    houses.map(async h => await page.evaluate(el => el.href, h))
  );
};

const getLink = async (page, selector) => {
  const element = await page.$(selector);
  return await page.evaluate(el => el.href, element);
};

const scrapeLinks = async url => {
  const page = await scraper.initPage();
  await page.goto(url);
  console.log("goto");
  let links = [];
  let firstPage = true;
  let hasNextPage = false;

  do {
    if (!firstPage) {
      const link = await getLink(page, "a.hsr-pagination-next");
      await page.goto(link);
      console.log("get links from " + link);
    }
    links = links.concat(await getLinks(page));
    firstPage = false;
    try {
      var nextPage = await page.$("a.hsr-pagination-next");
      hasNextPage = nextPage ? true : false;
    } catch (e) {
      hasNextPage = false;
    }
  } while (hasNextPage);
  await scraper.dispose();
  console.log("scraped " + links.length + " links");
  return links;
};

const retryScrapeLinks = async (page, url) => {
  var maxRetries = 5;
  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      return await scrapeLinks(page, url);
    } catch (error) {
      console.log("attempt " + (retries + 1) + " to scrape links failed");
      if (retries >= maxRetries - 1) {
        throw error;
      }
    }
  }
};

const linkScraper = {
  retryScrapeLinks: retryScrapeLinks
};

module.exports = linkScraper;
