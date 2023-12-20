import { ServerWritableStream } from "@grpc/grpc-js";

interface OnboardRequest {
  orderId: number;
  degreeId: number;
}

export class ProcessService {
  processor(call: ServerWritableStream<OnboardRequest, any>) {
    let onboardRequest: OnboardRequest = call.request;
    let time = onboardRequest.orderId * 1000 + onboardRequest.degreeId * 10;
    call.write({ status: 0 });
    call.write({ status: 1 });
    setTimeout(() => {
      call.write({ status: 2 });
      setTimeout(() => {
        call.write({ status: 3 });
        call.end();
      }, time);
    }, time);
  }
}

export const Process = new ProcessService();
