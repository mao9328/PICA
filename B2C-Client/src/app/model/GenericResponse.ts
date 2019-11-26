export class GenericResponse<T> {

    Result: T;
    Error: boolean;
    Message: string;
    ErrorCode: string;
    Rows: number;
}
