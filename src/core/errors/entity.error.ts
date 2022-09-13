import { CustomError } from "./custom.error";

export class EntityError extends CustomError {
  constructor(errorCode = '', message = 'Entity error', status = 401) {
    super(`Entity${errorCode && '.' + errorCode}`, message, status);
  }

  static NotFound(message = 'Entity not found') {
    return new EntityError('notFound', message, 404);
  }

  static AlreadyExisted(message = 'Entity already existed') {
    return new EntityError('alreadyExisted', message, 400);
  }
}
