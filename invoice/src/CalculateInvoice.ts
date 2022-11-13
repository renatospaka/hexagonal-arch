import CurrencyGatewayInterface from "./CurrencyGateway";
import Invoice from "./Invoice";
import TransactionDAOInterface from "./TransactionDAO";

export default class CalculateInvoice {
  constructor(readonly transactionDAO: TransactionDAOInterface, readonly currencyGateway: CurrencyGatewayInterface) {}

  async execute(cardNumber: string) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
  
    const currencies = await this.currencyGateway.getCurrencies();
    const transactions = await this.transactionDAO.getTransactions(cardNumber, month, year);
    
    const invoices = new Invoice(transactions, currencies);
    const total = await invoices.getTotal();
    return total;
  }
}
