export default interface TransactionDAOInterface {
  getTransactions(cardNumber: string, month: number, year: number): Promise<any>;
}
