export default interface HttpServerInterface {
  register(method: string, url: string, cb: Function): Promise<void>;
  listen(port: number): Promise<void>;
}
