const puppeteer = require("puppeteer");
let browers;

const initPage = async () => {
  browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  console.log("launched puppeteer");
  const page = await browser.newPage();
  console.log("new page");
  await page.setViewport({ width: 1920, height: 974 });
  console.log("viewport");
  return page;
};

const dispose = async () => await browser.close();

const scraper = {
  initPage: initPage,
  dispose: dispose
};

module.exports = scraper;
