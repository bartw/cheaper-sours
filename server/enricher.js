const calculateAskingPricePerSquareMeter = (askingPrice, area) => {
  if (askingPrice && area) {
    const askingPricePerSquareMeter = askingPrice / area;
    const roundedAskingPricePerSquareMeter =
      Math.round(askingPricePerSquareMeter * 100) / 100;
    return roundedAskingPricePerSquareMeter;
  }
  return 0;
};

const calculatePercentageDifference = (value1, value2) => {
  if (value2) {
    const percentageDifference = (value1 - value2) / value2 * 100;
    const roundedPercentageDifference =
      Math.round(percentageDifference * 100) / 100;
    return roundedPercentageDifference;
  }
  return 0;
};

const enrichData = data => {
  const vraagprijsPerM2 = calculateAskingPricePerSquareMeter(
    data.prijs,
    data.woonoppervlak
  );
  const procentueelVerschilSchatting = calculatePercentageDifference(
    data.prijs,
    data.marktwaarde
  );
  const procentueelVerschilMinSchatting = calculatePercentageDifference(
    data.prijs,
    data.marktwaardeMin
  );
  return Object.assign(
    {},
    data,
    { vraagprijsPerM2: vraagprijsPerM2 },
    { procentueelVerschilSchatting: procentueelVerschilSchatting },
    { procentueelVerschilMinSchatting: procentueelVerschilMinSchatting }
  );
};

const enrich = data => data.map(enrichData);

const enricher = {
  enrich: enrich
};

module.exports = enricher;
