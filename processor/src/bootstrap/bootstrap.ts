import { App } from "./app";
import { Grpc } from "./grpc";

/**
 * @description Start the grpc and Express server
 */

export class Bootstrap {
  private grpc: Grpc;
  private app: App;

  constructor() {
    this.startApplication();
  }

  private async startApplication() {
    this.grpc = new Grpc();
    this.app = new App();
  }
}
