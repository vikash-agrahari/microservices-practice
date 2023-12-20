import * as path from "path";
import * as grpc from "@grpc/grpc-js";
import { Options, PackageDefinition, loadSync } from "@grpc/proto-loader";
import {
  GrpcObject,
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import { processRoute } from "../routes/process.routes";

export class Grpc {
  private protoFilePath = "./../../../../proto/processing.proto";
  public processPackage: any;
  public grpcServer: grpc.Server;
  private port: number = 5002;

  constructor() {
    this.startGrpcServer();
  }

  private GRPC = {
    PROTO_FILE_OPTIONS: {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    },
  };

  /**
   * @description Load Proto file for process Service
   */
  private loadProtoFile(): void {
    const protoOptions: Options = this.GRPC.PROTO_FILE_OPTIONS;

    const packageDefinition: PackageDefinition = loadSync(
      path.resolve(__dirname, this.protoFilePath),
      protoOptions
    );

    const grpcObject: GrpcObject = loadPackageDefinition(packageDefinition);
    this.processPackage = grpcObject.processingPackage;
  }

  /**
   * @description Expose Process services
   */
  private loadServiceDefinition(): void {
    processRoute.loadServiceDefinition(this.grpcServer, this.processPackage);
  }

  /**
   * @description initialise Grpc Server
   */

  private initialiseGrpcServer(): void {
    this.grpcServer.bindAsync(
      `0.0.0.0:${this.port}`,
      ServerCredentials.createInsecure(),
      this.grpcCallback
    );
  }

  /**
   * @description handler for Grpc server when initialising server
   * @param {Error} err
   * @param {number} port
   * @returns {void}
   */
  private grpcCallback = (err: Error | null, port: number): void => {
    if (err) {
      console.error(err);
      return;
    }
    this.grpcServer.start();
    console.log(`Grpc Server listening on ${port}`);
  };

  /**
   * @description Initiate Grpc Server
   */
  private startGrpcServer() {
    this.loadProtoFile();
    this.grpcServer = new Server();
    this.loadServiceDefinition();
    this.initialiseGrpcServer();
  }
}
