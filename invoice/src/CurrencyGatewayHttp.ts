import axios from "axios";
import CurrencyGatewayInterface from "./CurrencyGateway";

export default class CurrencyGatewayHttp implements CurrencyGatewayInterface {
  async getCurrencies(): Promise<any> {
    const response = await axios.get("http://app:3001/currencies");
    const currencies = response.data;
    return currencies;
  }
}
