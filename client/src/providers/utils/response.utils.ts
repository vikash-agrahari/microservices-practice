import { GrpcResponse, HttpResponse } from "../../interfaces/globle.interface";

export class ResponseUtils {
    grpcResponseHandler(res: GrpcResponse): HttpResponse {
        const response: HttpResponse = {
            status: res.status,
            message: res.message,
            timestamp: res.timestamp,
            data: res.data ? JSON.parse(res.data) : null,
            error: res.error ? JSON.parse(res.error) : null,
        };

        return response;
    }
}

export const ResUtils = new ResponseUtils();