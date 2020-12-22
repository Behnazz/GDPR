const amount = () => Math.floor(100000 + Math.random() * 900000);
const randomCreatedDate = () => new Date().toISOString().split("T")[0];
const idGenerator = () => Date.now();
function createData(country, company, amount, date, id) {
  return { country, company, amount, date, id };
}

export const rows = [
  createData(
    "Germany",
    "Company-A",
    "€ " + amount(),
    randomCreatedDate(),
    idGenerator()
  ),
  createData(
    "UK",
    "Company-B",
    "£ " + amount(),
    randomCreatedDate(),
    idGenerator()
  ),
  createData(
    "Spain",
    "Company-C",
    "€ " + amount(),
    randomCreatedDate(),
    idGenerator()
  ),
  createData(
    "Romania",
    "Company-D",
    "€ " + amount(),
    randomCreatedDate(),
    idGenerator()
  ),
  createData(
    "Poland",
    "Company-E",
    "€ " + amount(),
    randomCreatedDate(),
    idGenerator()
  ),
];
