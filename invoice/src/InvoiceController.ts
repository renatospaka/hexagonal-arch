import CalculateInvoice from "./CalculateInvoice";
import HttpServerInterface from "./HttpServer";

export default class InvoiceController {
  constructor(readonly httpServer: HttpServerInterface, readonly calculateInvoice: CalculateInvoice) {
    httpServer.register("get", "/cards/:cardNumber/invoices", async function (params: any, body: any) {
      const total = await calculateInvoice.execute(params.cardNumber);
      return total;
    });
  }
}
