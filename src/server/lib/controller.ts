import mongoose = require('mongoose');
import express = require('express');
import {APIMethod, MiddlewareMethod} from "./api-method";
import Request = Express.Request;
import {buildUrl} from "../helpers/api";
import * as _ from "lodash";

interface controller {
    model:mongoose.Model<any>
    urlPart:string;
}

export interface methodObj {
    method:Function,
    type:string,
    withId:boolean,
    uriPart:string,
    middleware:Array<Function>
}

function bind(fn:Function, scope:Object) {
    return function () {
        fn.apply(scope, arguments);
    }
}


export abstract class ApiController implements controller {
    urlPart:string;
    model:mongoose.Model<any>;
    // base methods for the controller
    private methods:methodObj[];

    constructor() {
        this.methods = [
            {
                method: this.single,
                type: 'get',
                withId: true,
                uriPart: '',
                middleware: []
            },
            {
                method: this.save,
                type: 'put',
                withId: true,
                uriPart: '',
                middleware: []
            },
            {
                method: this.create,
                type: 'post',
                withId: false,
                uriPart: '',
                middleware: []
            },
            {
                method: this.destroy,
                type: 'delete',
                withId: true,
                uriPart: '',
                middleware: []
            },
            {
                method: this.query,
                type: 'get',
                withId: false,
                uriPart: '',
                middleware: []
            }
        ];
    }

    register(app:express.Router) {
        var self = this;
        _.each(this.methods, (method:methodObj) => {
            var routParams:Array<any> = [buildUrl(this.urlPart, method.withId)];

            _.each(method.middleware, (middleware:Function) => {
                routParams.push(MiddlewareMethod(middleware));
            });

            routParams.push(bind(method.method, self));
            app[method.type].apply(app, routParams);
        })
    }


    public single = APIMethod((req:Request) => {
        return 'single';
    });

    public save = APIMethod((req:Request) => {
        return 'save';
    });

    public create = APIMethod((req:Request) => {
        return 'create';
    });

    public destroy = APIMethod((req:Request) => {
        return 'destroy';
    });

    public query = APIMethod((req:Request) => {
        return 'query';
    });
}