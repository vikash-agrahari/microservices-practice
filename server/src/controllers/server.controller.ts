import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { ResUtils } from "../providers/utils/response.util";
import { ServerServiceInterface } from "../interfaces/grpc-service.interface";
import { GrpcResponse } from "../interfaces/globle.interface";

export class ServerController{
    async printMessage(
        req: ServerUnaryCall<ServerServiceInterface.InputName, GrpcResponse>,
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

    async printEmail(
        req: ServerUnaryCall<ServerServiceInterface.InputEmail, GrpcResponse>,
        res: sendUnaryData<GrpcResponse>,
    ) {
        try {
            
            const response = `Your email is ${req.request.email}`;
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

export const ServerC = new ServerController();