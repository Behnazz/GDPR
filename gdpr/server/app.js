const express = require("express");
const { rows, createData } = require("./helpers/dataGenerator");

const app = express();
app.use(express.json({ extended: false }));
let data = rows;
app.get("/", (req, res) => res.send("API running"));
app.get("/api/all", (req, res) => res.json(data));
app.get("/api/all/:id", (req, res) => {
  const { id } = req.params;
  const row = data.filter((item) => item.id === id)[0];
  res.json(row);
});
app.post("/api/add-fines", (req, res) => {
  const {
    country,
    company,
    currency,
    amount,
    description: fineDetails,
  } = req.body;
  const createdData = createData(
    country,
    company,
    currency,
    amount,
    fineDetails
  );
  data.push(createdData);
  res.json(createdData);
});
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const filteredData = data.filter((item) => item.id !== id);
  data = filteredData;
  res.json(data);
});
module.exports = app;
