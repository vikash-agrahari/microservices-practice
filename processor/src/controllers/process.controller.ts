import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { ResUtils } from "../providers/utils/response.util";
import { ProcessServiceInterface } from "../interfaces/grpc-service.interface";
import { GrpcResponse } from "../interfaces/globle.interface";

export class ProcessController{
    async printMessage(
        req: ServerUnaryCall<ProcessServiceInterface.InputName, GrpcResponse>,
        res: sendUnaryData<GrpcResponse>,
    ) {
        try {
            
            const response = `Your Name is ${req.request.name}`;
            const result = {
                data: response,
                status: 200,
                statusMsg: 'success',
            };
            console.log("Console result:------------------------>>>>", result);
            res(null, ResUtils.grpcSuccessResponse(result));
        } catch (error) {
            throw error;
        }
    }
}

export const ProcessC = new ProcessController();