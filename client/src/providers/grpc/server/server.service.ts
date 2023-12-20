import { credentials } from "@grpc/grpc-js";
import { GrpcService } from "../grpc.service";
import { firstValueFrom } from "rxjs";
import { GrpcResponse } from "../../../interfaces/globle.interface";
import { ServerServiceInterface } from "../../../interfaces/grpc-service.interface";
import { ResUtils } from "../../utils/response.utils";

export class ServerService extends GrpcService {
  private servicePort: number = 5002;
  private ServerService: any;
  constructor() {
    super("server.proto", "serverPackage");
    this.loadService();
  }

  /**
   * @description Load All RPC Services of Server microservice
   */
  private loadService(): void {
    let url = `localhost:${this.servicePort}`;
    console.log("Server GRPC Service URL", url);
    this.ServerService = new this.package.Processing(
      url,
      credentials.createInsecure()
    );
  }

  async inputName(payload: ServerServiceInterface.InputName) {
    try {
      const res: GrpcResponse = await firstValueFrom(
        this.invokeService(this.ServerService, "InputName", payload)
      );

      console.log(res);
      return ResUtils.grpcResponseHandler(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async inputEmail(payload: ServerServiceInterface.InputEmail) {
    try {
      const res: GrpcResponse = await firstValueFrom(
        this.invokeService(this.ServerService, "InputEmail", payload)
      );

      console.log(res);
      return ResUtils.grpcResponseHandler(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const Server = new ServerService();
