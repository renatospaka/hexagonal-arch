import TransactionDAO from "./TransactionDAO";
import pgp from "pg-promise";

export default class TransactionDAODatabase implements TransactionDAO {
  async getTransactions(cardNumber: string, month: number, year: number): Promise<any> {
    const connection = pgp()("postgres://app:secret@db:5432/hexagonal_arch");
    const transactions = await connection.query(
      "select * from public.card_transaction where card_number = $1 and extract(month from date) = $2 and extract(year from date) = $3", 
      [cardNumber,
      month,
      year]
    );
    return transactions;
  }
}
