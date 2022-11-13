import express from "express";
import CalculateInvoice from "./CalculateInvoice";

export default class InvoiceController {
  constructor(readonly calculateInvoice: CalculateInvoice) {
    const app = express();
    app.get("/cards/:cardNumber/invoices", async function (req, res) {
      const total = await calculateInvoice.execute(req.params.cardNumber);
      res.json({ 
        total: total 
      });
    });

    app.listen(3000);
  }
}
