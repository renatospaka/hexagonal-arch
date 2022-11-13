import express from "express";
import HttpServerInterface from "./HttpServer";

export default class ExpressAdapter implements HttpServerInterface {
  app: any;
  
  constructor() {
    this.app = express();
  }

  async register(method: string, url: string, cb: Function): Promise<void> {
    this.app[method](url, async function (req: any, res: any) {
      const out = await cb(req.params, req.body);
      return res.json(out);
    });
  }

  async listen(port: number): Promise<void> {
    return this.app.listen(port);
  }
}
