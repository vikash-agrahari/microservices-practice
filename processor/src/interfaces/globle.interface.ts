export interface GrpcResponse extends Response {
  data: string;
  error: string;
}

interface Response {
  status: number;
  message: string;
  timestamp: number;
}

export interface HttpResponse extends Response {
  data: Record<string, any> | null;
  error: Record<string, any> | null;
}
