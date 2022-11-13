import AxiosAdapter from "./AxiosAdapter";
import CalculateInvoice from "./CalculateInvoice";
import CurrencyGatewayHttp from "./CurrencyGatewayHttp";
import ExpressAdapter from "./ExpressAdapter";
import InvoiceController from "./InvoiceController";
import PgPromisseAdapter from "./PgPromisseAdapter";
import TransactionDAODatabase from "./TransactionDAODatabase";

const connection = new PgPromisseAdapter();
const transactionDAO = new TransactionDAODatabase(connection);
const baseUrl = "http://app:3001";
const httpClient = new AxiosAdapter();
const currencyGateway = new CurrencyGatewayHttp(httpClient, baseUrl);
const calculateInvoice = new CalculateInvoice(transactionDAO, currencyGateway);

const httpServer = new ExpressAdapter();
new InvoiceController(httpServer, calculateInvoice);
httpServer.listen(3000);
