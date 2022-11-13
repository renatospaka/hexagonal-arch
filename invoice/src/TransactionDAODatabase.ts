import TransactionDAO from "./TransactionDAO";
import ConnectionInterface from "./Connection";

export default class TransactionDAODatabase implements TransactionDAO {
  constructor(readonly connection: ConnectionInterface) {

  }
  async getTransactions(cardNumber: string, month: number, year: number): Promise<any> {
    const transactions = await this.connection.query(
      "select * from public.card_transaction where card_number = $1 and extract(month from date) = $2 and extract(year from date) = $3", 
      [cardNumber,
      month,
      year]
    );
    return transactions;
  }
}
