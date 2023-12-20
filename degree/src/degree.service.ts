import * as grpc from "@grpc/grpc-js";

interface Degree {
  id: number;
  degreeId: number;
  title: string;
  major: string;
}
export class DegreeService {
  private DEGREE: Degree[] = [
    {
      id: 100,
      degreeId: 1000,
      title: "Engineering",
      major: "Electronics",
    },
    {
      id: 200,
      degreeId: 2000,
      title: "Engineering",
      major: "Computer Science",
    },
    {
      id: 300,
      degreeId: 3000,
      title: "Engineering",
      major: "Telecommunication",
    },
    {
      id: 400,
      degreeId: 4000,
      title: "Commerce",
      major: "Accounts",
    },
  ];

  async findDegree(
    call: grpc.ServerUnaryCall<any, Degree>,
    callback: grpc.sendUnaryData<Degree>
  ) {
    const degree = this.DEGREE.find((d) => d.degreeId === call.request.id);
    if (degree) {
      callback(null, degree);
    } else {
      callback({
        message: "Degree not found",
        code: grpc.status.INVALID_ARGUMENT,
      });
    }
  }
}

export const Degree = new DegreeService();
