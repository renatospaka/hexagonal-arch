import CurrencyGatewayInterface from "./CurrencyGateway";
import HttpClientInterface from "./HttpClient";

export default class CurrencyGatewayHttp implements CurrencyGatewayInterface {
  constructor(readonly httpClient: HttpClientInterface, readonly baseUrl: string) {}

  async getCurrencies(): Promise<any> {
    const currencies = await this.httpClient.get(`${this.baseUrl}/currencies`);
    return currencies;
  }
}
