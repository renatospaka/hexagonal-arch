import axios from "axios";
import CurrencyGatewayInterface from "./CurrencyGateway";

export default class CurrencyGatewayHttp implements CurrencyGatewayInterface {
  constructor(readonly baseUrl: string) {}

  async getCurrencies(): Promise<any> {
  const response = await axios.get(`${this.baseUrl}/currencies`);
    const currencies = response.data;
    return currencies;
  }
}
