import { Server } from '@grpc/grpc-js';
import { ProcessC } from '../controllers/process.controller';

class ProcessRoute {
 
    loadServiceDefinition(grpcServer: Server, processPackage: any): void {
        grpcServer.addService(processPackage.Processing.service, {
            InputName: ProcessC.printMessage,
        });
    }
}

export const processRoute = new ProcessRoute();
