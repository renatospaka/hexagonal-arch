import express from "express";
import CalculateInvoice from "./CalculateInvoice";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import TransactionDAODatabase from "./TransactionDAODatabase";

const app = express();
app.get("/cards/:cardNumber/invoices", async function (req, res) {
  const transactionDAO = new TransactionDAODatabase();
  const currencyGateway = new CurrencyGatewayHttp();
  const calculateInvoice = new CalculateInvoice(transactionDAO, currencyGateway);
  const total = await calculateInvoice.execute(req.params.cardNumber);
  res.json({ 
    total: total 
  });
});

app.listen(3000);
