export class APIError extends Error {
    public name = "APIError";

    constructor(public message?: string, public code: number = 400) {
        super(message);
    }
}

export class AuthError extends Error {
    public name = "AuthError";

    constructor(public message?: string, public code: number = 400) {
        super(message);
    }
}

export class MiddlewareError extends Error {
    public name = 'MiddlewareError';

    constructor(public message?: string, public code: number = 400) {
        super(message);
    }
}

export class NotFound extends Error {
    public name = 'NotFound';

    constructor(public message?: string, public code: number = 404) {
        super(message);
    }
}

export class ModelNotSaved extends Error {
    public name = 'ModelNotSaved';

    constructor(public message?: string, public code: number = 500) {
        super(message);
    }
}

export class NotImplemented extends Error {
    public name = 'NotImplemented';

    constructor(public message?: string, public body?: Object) {
        super(message);
    }

}