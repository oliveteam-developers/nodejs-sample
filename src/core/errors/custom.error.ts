import { HttpError } from "./http.error";

export class CustomError extends HttpError {
  public errorCode: string;
  constructor(errorCode: string = 'Error', message: string = 'Error', status: number = 500) {
    super(message, status);
    this.errorCode = errorCode;
  }
}
