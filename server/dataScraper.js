const getInnerHtmls = async (page, selector) => {
  const elements = await page.$$(selector);
  return await Promise.all(
    elements.map(async e => await page.evaluate(el => el.innerHTML, e))
  );
};

const getInnerHtml = async (page, selector) => {
  const element = await page.$(selector);
  if (!element) {
    return null;
  }
  return await page.evaluate(el => el.innerHTML, element);
};

const scrape = async (page, link) => {
  await page.goto(link);
  console.log("scrape from " + link);

  const names = await getInnerHtmls(page, ".listing-detail-name");
  const values = await getInnerHtmls(page, ".listing-detail-value");

  const tuples = names.map((n, i) => {
    return {
      name: n,
      value: values[i] || ""
    };
  });

  tuples.push({ name: "street", value: await getInnerHtml(page, ".street") });
  tuples.push({ name: "city", value: await getInnerHtml(page, ".postcode") });
  tuples.push({
    name: "price",
    value: await getInnerHtml(page, ".submenu-item-value")
  });
  tuples.push({
    name: "marktwaarde",
    value: await getInnerHtml(page, ".geschatte-marktwaarde span.number")
  });
  tuples.push({
    name: "marktwaardeMin",
    value: await getInnerHtml(
      page,
      ".geschatte-marktwaarde-range span.number-min"
    )
  });
  tuples.push({
    name: "marktwaardeMax",
    value: await getInnerHtml(
      page,
      ".geschatte-marktwaarde-range span.number-max"
    )
  });
  tuples.push({ name: "link", value: link });

  return tuples;
};

const scrapeData = async (page, links) => {
  let data = [];
  for (let i = 0; i < links.length; i++) {
    data.push(await scrape(page, links[i]));
  }
  console.log("scraped the data of " + data.length + " links");
  return data;
};

const retryScrapeData = async (page, links) => {
  var maxRetries = 5;
  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      return await scrapeData(page, links);
    } catch (error) {
      console.log("attempt " + (retries + 1) + " to scrape data failed");
      if (retries >= maxRetries - 1) {
        throw error;
      }
    }
  }
};

const dataScraper = {
  retryScrapeData: retryScrapeData
};

module.exports = dataScraper;
