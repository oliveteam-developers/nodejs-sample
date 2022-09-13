import { CustomError } from "./custom.error";

export class UnAuthenticatedError extends CustomError {
  constructor(errorCode = '', message = 'Unauthenticated', status = 401) {
    super(`Unauthenticated${errorCode && '.' + errorCode}`, message, status);
  }
}
