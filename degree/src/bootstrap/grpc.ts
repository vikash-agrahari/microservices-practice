import * as path from "path";
import * as grpc from "@grpc/grpc-js";
import { Options, PackageDefinition, loadSync } from "@grpc/proto-loader";
import {
  GrpcObject,
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import { Degree } from "../degree.service";

export class Grpc {
  private protoFilePath = "./../../../../proto/degree.proto";
  public degreePackage: any;
  public grpcServer: grpc.Server;
  private grpcPort: number = 5001;

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
   * @description Load Proto file for degree Service
   */
  private loadProtoFile(): void {
    const protoOptions: Options = this.GRPC.PROTO_FILE_OPTIONS;

    const packageDefinition: PackageDefinition = loadSync(
      path.resolve(__dirname, this.protoFilePath),
      protoOptions
    );

    const grpcObject: GrpcObject = loadPackageDefinition(packageDefinition);
    this.degreePackage = grpcObject.degreePackage;
  }

  /**
   * @description Expose Degree services
   */
  private loadServiceDefinition(): void {
    const grpcPackage = this.degreePackage;

    const serviceDefinition: grpc.ServiceDefinition<any> = grpcPackage.Degrees
      .service as any;
    const untypedServiceImplementation: grpc.UntypedServiceImplementation = {
      find: Degree.findDegree,
    } as any;
    this.grpcServer.addService(serviceDefinition, untypedServiceImplementation);
  }

  /**
   * @description initialise Grpc Server
   */

  private initialiseGrpcServer(): void {
    this.grpcServer.bindAsync(
      `0.0.0.0:${this.grpcPort}`,
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
