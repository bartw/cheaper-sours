const puppeteer = require("puppeteer");
const logger = require("./logger");
let browser;

const initPage = async () => {
  browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  logger.log("launched puppeteer");
  const page = await browser.newPage();
  logger.log("new page");
  await page.setViewport({ width: 1920, height: 974 });
  logger.log("viewport");
  return page;
};

const dispose = async () => await browser.close();

const scraper = {
  initPage: initPage,
  dispose: dispose
};

module.exports = scraper;
