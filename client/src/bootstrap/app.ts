import express, { Express } from "express";

export class App {
  private app: Express;
  private port: number = 4001;

  constructor() {
    this.startApp();
  }

  /**
   * @description Steps to Start the Express Sever
   */
  private startApp() {
    this.app = express();
    this.intialiseServer();
  }

  /**
   * @description Initiate Express Server
   */
  private intialiseServer() {
    this.app.listen(this.port, this.callback);
  }

  /**
   * @description handler for Express server when initialising server
   */
  private callback = () => {
    console.log(`server listing on Port: ${this.port}`);
  };
}
