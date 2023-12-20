import { Options, PackageDefinition, loadSync } from '@grpc/proto-loader';
import { GRPC } from '../../common/constant';
import path from 'path';
import { GrpcObject, loadPackageDefinition } from '@grpc/grpc-js';
import { Observable, Observer } from 'rxjs';
import { GrpcResponse } from '../../interfaces/globle.interface';

export class GrpcService {
    public package: any;
    constructor(protoFilename: string, packageName: string) {
        this.loadProtoFile(protoFilename, packageName);
    }

    /**
     * @description Load Proto file of Service
     */
    private loadProtoFile(protoFilename: string, packageName: string): void {
        const protoOptions: Options = GRPC.PROTO_FILE_OPTIONS;

        const packageDefinition: PackageDefinition = loadSync(
            path.resolve(__dirname, `./../../../../../proto/${protoFilename}`),
            protoOptions,
        );

        const grpcObject: GrpcObject = loadPackageDefinition(packageDefinition);
        this.package = grpcObject[packageName];
    }

    /**
     * @description Invoke Grpc Service Method
     * @param service
     * @param method
     * @param payload
     * @returns {GrpcResponse}
     */
    protected invokeService<Type>(
        service: any,
        method: string,
        payload: Type,
    ): Observable<GrpcResponse> {
        try {
            return new Observable((observer: Observer<any>) => {
                service[method](payload, (err: Error, res: any) => {
                    if (err) {
                        observer.next(err);
                    } else {
                        observer.next(res);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description Invoke Grpc Server Writable / Client Readable Stream
     * @param service
     * @param method
     * @param payload
     * @returns {GrpcResponse}
     */
    protected invokeClientReadableStream<Type>(
        service: any,
        method: string,
        payload: Type,
    ): Observable<GrpcResponse> {
        try {
            return new Observable((observer: Observer<any>) => {
                const readableStream = service[method](payload, (err: Error, res: any) => {
                    if (err) {
                        console.log('Grpc--invokeServerWritableStream--err ::', err);
                    } else {
                        console.log('Grpc--invokeServerWritableStream--res ::', res);
                    }
                });

                readableStream.on('data', (data: any) => {
                    observer.next(data);
                });

                readableStream.on('end', (data: any) => {
                    observer.complete();
                });

                readableStream.on('error', (error: any) => {
                    observer.error(error);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description Invoke Grpc Server Readable / Client Writable Stream
     * @param service
     * @param method
     * @param payload
     * @returns {GrpcResponse}
     */
    protected invokeClientWritableStream<Type>(
        service: any,
        method: string,
        payload: Type,
    ): Observable<GrpcResponse> {
        try {
            const writableStream = service[method](payload, (err: Error, res: any) => {
                if (err) {
                    console.log('Grpc--invokeServerWritableStream--err ::', err);
                } else {
                    console.log('Grpc--invokeServerWritableStream--res ::', res);
                }
            });
            /**
             * @description Write data to Stream - writableStream.write(data)
             * @description End Stream - writableStream.end();
             */
            return writableStream
        } catch (error) {
            throw error;
        }
    }
}
