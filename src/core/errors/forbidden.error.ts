import { CustomError } from "./custom.error";

export class ForbiddenError extends CustomError {
  constructor(errorCode = '', message = 'Forbidden', status = 403) {
    super(`Forbidden${errorCode && '.' + errorCode}`, message, status);
  }
}
