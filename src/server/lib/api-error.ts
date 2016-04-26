export class APIError extends Error {
    public name = "APIError";

    constructor(public message?:string, public code:number = 400) {
        super(message);
    }
}

export class AuthError extends Error {
    public name = "AuthError";

    constructor(public message?:string, public code:number = 400) {
        super(message);
    }
}