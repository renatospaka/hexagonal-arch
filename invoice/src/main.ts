import axios from "axios";
import express from "express";
import pgp from "pg-promise";

const app = express();
app.get("/cards/:cardNumber/invoices", async function (req, res) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const response = await axios.get("http://app:3001/currencies");
  const currencies = response.data;
  console.log(currencies);

  const connection = pgp()("postgres://app:secret@db:5432/hexagonal_arch");
  const transactions = await connection.query(
    "select * from public.card_transaction where card_number = $1 and extract(month from date) = $2 and extract(year from date) = $3", 
    [req.params.cardNumber,
    month,
    year]
  );
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.currency === "BRL") {
      total += parseFloat(transaction.amount);
    }
    if (transaction.currency === "USD") {
      total += parseFloat(transaction.amount) * currencies.usd;
    }
  }
  res.json({ 
    total: total 
  });
});

app.listen(3000);
