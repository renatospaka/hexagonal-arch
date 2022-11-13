import ConnectionInterface from "./Connection";
import pgp from "pg-promise";

export default class PgPromisseAdapter implements ConnectionInterface {
  connection: any;
  
  constructor() {
    this.connection = pgp()("postgres://app:secret@db:5432/hexagonal_arch");
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  close(): Promise<any> {
    return this.connection.$pool.end();
  }
}
