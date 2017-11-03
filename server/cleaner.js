const cleanValue = value => (value ? value.replace(/\s|€|\./g, "") : "");

const cleanData = tuples =>
  tuples.map(tuple => {
    const name = tuple.name.toLowerCase();
    if (name.includes("soort")) {
      return { soort: tuple.value };
    } else if (name.includes("bouwjaar")) {
      return { bouwjaar: tuple.value };
    } else if (name.includes("link")) {
      return { link: tuple.value };
    } else if (name.includes("woonoppervlak")) {
      return { woonoppervlak: parseInt(tuple.value) };
    } else if (name.includes("perceeloppervlak")) {
      return { perceeloppervlak: parseInt(tuple.value) };
    } else if (name.includes("inhoud")) {
      return { inhoud: parseInt(tuple.value) };
    } else if (name.includes("aantal kamers")) {
      return { kamers: parseInt(tuple.value) };
    } else if (name.includes("slaapkamers")) {
      return { slaapkamers: parseInt(tuple.value) };
    } else if (name.includes("energielabel")) {
      return { energielabel: tuple.value };
    } else if (name.includes("street")) {
      return { straat: tuple.value };
    } else if (name.includes("city")) {
      return { gemeente: tuple.value };
    } else if (name.includes("price")) {
      return { prijs: parseInt(cleanValue(tuple.value)) };
    } else if (name.includes("marktwaardemin")) {
      return { marktwaardeMin: parseInt(cleanValue(tuple.value)) };
    } else if (name.includes("marktwaardemax")) {
      return { marktwaardeMax: parseInt(cleanValue(tuple.value)) };
    } else if (name.includes("marktwaarde")) {
      return { marktwaarde: parseInt(cleanValue(tuple.value)) };
    } else {
      return {};
    }
  });

const clean = data => {
  var cleanedData = data.map(cleanData);
  return cleanedData.map(tuples => Object.assign({}, ...tuples));
};

const cleaner = {
  clean: clean
};

module.exports = cleaner;
