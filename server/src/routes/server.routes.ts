import { Server } from '@grpc/grpc-js';
import { ServerC } from '../controllers/server.controller';

class ServerRoute {
 
    loadServiceDefinition(grpcServer: Server, serverPackage: any): void {
        grpcServer.addService(serverPackage.Processing.service, {
            InputName: ServerC.printMessage,
            InputEmail: ServerC.printEmail,
        });
    }
}

export const serverRoute = new ServerRoute();
