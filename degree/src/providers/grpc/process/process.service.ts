import { credentials } from "@grpc/grpc-js";
import { GrpcService } from "../grpc.service";
import { firstValueFrom } from "rxjs";
import { GrpcResponse } from "../../../interfaces/globle.interface";
import { ProcessServiceInterface } from "../../../interfaces/grpc-service.interface";
import { ResUtils } from "../../utils/response.utils";

export class ProcessService extends GrpcService {
  private servicePort: number = 5002;
  private processService: any;
  constructor() {
    super("processing.proto", "processingPackage");
    this.loadService();
  }

  /**
   * @description Load All RPC Services of Process microservice
   */
  private loadService(): void {
    let url = `localhost:${this.servicePort}`;
    console.log("Process GRPC Service URL", url);
    this.processService = new this.package.Processing(
      url,
      credentials.createInsecure()
    );
  }

  async inputName(payload: ProcessServiceInterface.InputName) {
    try {
      const res: GrpcResponse = await firstValueFrom(
        this.invokeService(this.processService, "InputName", payload)
      );

      console.log(res);
      return ResUtils.grpcResponseHandler(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export const Process = new ProcessService();
