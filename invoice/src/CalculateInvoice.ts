import CurrencyGatewayInterface from "./CurrencyGateway";
import TransactionDAOInterface from "./TransactionDAO";

export default class CalculateInvoice {
  constructor(readonly transactionDAO: TransactionDAOInterface, readonly currencyGateway: CurrencyGatewayInterface) {}

  async execute(cardNumber: string) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
  
    const currencies = await this.currencyGateway.getCurrencies();
    const transactions =await this.transactionDAO.getTransactions(cardNumber, month, year);
    let total = 0;
    for (const transaction of transactions) {
      if (transaction.currency === "BRL") {
        total += parseFloat(transaction.amount);
      }
      if (transaction.currency === "USD") {
        total += parseFloat(transaction.amount) * currencies.usd;
      }
    }

    return total;
  }
}
