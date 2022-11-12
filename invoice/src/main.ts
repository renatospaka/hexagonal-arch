import express from "express";
import pgp from "pg-promise";

const app = express();
app.get("/cards/:cardNumber/invoices", async function (req, res) {
  const connection = pgp()("postgres://app:secret@db:5432/hexagonal_arch");
  const transactions = await connection.query("select * from public.card_transaction where card_number = $1", req.params.cardNumber);
  let total = 0;
  for (const transaction of transactions) {
    total += parseFloat(transaction.amount);
  }
  res.json({ 
    total: total 
  });
});

app.listen(3000);
