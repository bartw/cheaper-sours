const puppeteer = require("puppeteer");
let browser;

const initPage = async () => {
  browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 974 });
  return page;
};

const dispose = async () => await browser.close();

const scraper = {
  initPage: initPage,
  dispose: dispose
};

module.exports = scraper;
