const { v4: uuid } = require("uuid");
const dummyText = require("./dummytext");

const amount = () => Math.floor(100000 + Math.random() * 900000);
const randomCreatedDate = () => new Date().toISOString().split("T")[0];
const idGenerator = () => uuid();

const fineDetails = dummyText.split(".");
function createData(country, company, currency, amount, fineDetails, date, id) {
  if (!id) id = idGenerator();
  if (!date) date = randomCreatedDate();
  return { country, company, currency, amount, fineDetails, date, id };
}

const rows = [
  createData("Germany", "Company-A", "€", amount(), fineDetails[0]),
  createData("UK", "Company-B", "£", amount(), fineDetails[1]),
  createData("Spain", "Company-C", "€", amount(), fineDetails[2]),
  createData("Romania", "Company-D", "€", amount(), fineDetails[3]),
  createData("Poland", "Company-E", "€", amount(), fineDetails[4]),
];

module.exports = { rows, createData };
