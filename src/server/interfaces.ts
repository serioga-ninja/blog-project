import {Request} from "express-serve-static-core";

export interface MyRequest extends Request {
    model?:any
}