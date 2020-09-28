import CURRENCIES from "../data/currencies";

const SELECT_OPTIONS = [...CURRENCIES]
  .map((currency) => ({ name: currency.name, code: currency.code }))
  .sort((a, b) => a.name.localeCompare(b.name));

const all = () => SELECT_OPTIONS;

const currencyName = (currencyCode) => {
  const currency = CURRENCIES.find((cur) => cur.code === currencyCode);

  if (!currency) {
    throw new Error(`A currency with code "${currencyCode}" not found.`);
  }

  return currency.name;
};

const toDecimal = (amount, currencyCode) => {
  const currency = CURRENCIES.find((cur) => cur.code === currencyCode);

  if (!currency) {
    throw new Error(`A currency with code "${currencyCode}" not found.`);
  }

  return amount / Math.pow(10, currency.exp);
};

const toMinor = (amount, currencyCode) => {
  const currency = CURRENCIES.find((cur) => cur.code === currencyCode);

  if (!currency) {
    throw new Error(`A currency with code "${currencyCode}" not found.`);
  }

  return Math.ceil(amount * Math.pow(10, currency.exp));
};

export default {
  all,
  currencyName,
  toMinor,
  toDecimal,
};
