import {IErrorResponse} from '../interfaces/i-error-response';

export class BaseError extends Error {

  public code: number = 500;

  public responseBody(body?: any): IErrorResponse {
    return {
      status: this.code,
      message: this.message,
      body: body
    }
  }

  constructor(public message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class APIError extends BaseError {
  public name = 'APIError';
  public code = 400;

  constructor(public message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export class AuthError extends BaseError {
  public name = 'AuthError';
  public code = 401;

  constructor(public message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthError.prototype);
  }

}

export class MiddlewareError extends BaseError {
  public name = 'MiddlewareError';

  constructor(public message: string, public code: number = 400) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MiddlewareError.prototype);
  }
}

export class NotFound extends BaseError {
  public name = 'NotFound';
  public code: number = 404;

  constructor(public message: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

export class ModelNotSaved extends BaseError {
  public name = 'ModelNotSaved';

  constructor(public message: string, public code: number = 500) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ModelNotSaved.prototype);
  }
}

export class NotImplemented extends BaseError {
  public name = 'NotImplemented';

  constructor(public message: string, public body?: Object) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotImplemented.prototype);
  }

}
