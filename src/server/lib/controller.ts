import mongoose = require('mongoose');
import express = require('express');
import {APIMethod, MiddlewareMethod} from "./api-method";
import * as APIHelper from "../helpers/api";
import * as _ from "lodash";
import {hasIdAttribute, preload} from "../middleware/api";
import Promise = require('bluebird');
import * as interfaces from "../interfaces";

export interface controller {
    urlPart: string;
    idAttribute?: string;
}

export interface methodObj {
    method: Function,
    type: string,
    withId: boolean,
    uriPart: string,
    middleware: Array<Function>
}

function bind(fn: Function, scope: Object) {
    return function () {
        fn.apply(scope, arguments);
    }
}


export abstract class ApiController implements controller {
    urlPart: string; // the part of url which /api/v1/:urlPart/bla-bla
    idAttribute: string = '_id';
    private _methods;
    // id attribute, or how we should looking for the entities

    constructor(private model?: mongoose.Model<any>) {
        this._methods = [
            {
                method: this.single,
                type: 'get',
                withId: true,
                uriPart: '',
                middleware: [hasIdAttribute(this.idAttribute), preload(this.idAttribute, this.model)]
            },
            {
                method: this.save,
                type: 'put',
                withId: true,
                uriPart: '',
                middleware: [hasIdAttribute(this.idAttribute), preload(this.idAttribute, this.model)]
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
                middleware: [hasIdAttribute(this.idAttribute), preload(this.idAttribute, this.model)]
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

    get methods() {
        return this._methods;
    }

    set methods(methods: Array<methodObj>) {
        this._methods = this._methods.concat(methods);
    }

    /**
     * Method registers all api methods for the current controller
     * @param app
     */
    register(app: express.Router) {
        var self = this;
        var methods = this.methods;

        _.each(methods, (method: methodObj) => {
            var routParams: Array<any> = [APIHelper.buildUrl(this.urlPart, method.withId, this.idAttribute, method.uriPart)];

            _.each(method.middleware, (middleware: Function) => {
                routParams.push(MiddlewareMethod(middleware));
            });

            routParams.push(bind(method.method, self));
            app[method.type].apply(app, routParams);
        })
    }

    /**
     * Fires before model was sending to the response
     * @param model
     * @return {Object}
     */
    public beforeModelSend(model): Object {
        return APIHelper.toModelView(model);
    }

    /**
     * Prepare request.body and set it to the model
     * @param {Object} data
     * @param {boolean} isNew
     * @returns {Object}
     */
    public prepareData(data: Object, isNew: boolean) {
        return data;
    }

    public beforeSave() {
        // TODO
    }

    public validate(data: Object) {
        return data;
    }

    public afterSave() {
        // TODO
    }

    public beforeRemove(model: mongoose.Model<any>) {
        return model;
    }

    public afterRemove() {
        // TODO
    }

    public requestToData(body: Object): Object {
        return body;
    }

    //--------------------- base api methods -------------------
    /**
     * Method returns single model
     * @type {Function}
     */
    public single = APIMethod((req: interfaces.MyRequest) => {
        var search = {};
        search[this.idAttribute] = req.params[this.idAttribute];
        return Promise.resolve(this.beforeModelSend(req.model))
    });

    /**
     * Method saves single model
     * @type {Function}
     */
    public save = APIMethod((req: interfaces.MyRequest) => {
        var data = this.requestToData(req.body);
        var search = {};
        search[this.idAttribute] = req.params[this.idAttribute];

        return Promise
            .bind(this)
            .then(() => {
                return [data, false];
            })
            .spread(this.prepareData)
            .then(this.validate)
            .then((data: Object) => {
                req.model.set(data);

                return req.model.save();
            })
            .then(this.beforeModelSend);
    });

    /**
     * Method creates single model
     * @type {Function}
     */
    public create = APIMethod((req: interfaces.MyRequest) => {
        var data = this.requestToData(req.body);

        return Promise
            .bind(this)
            .then(() => {
                return [data, true];
            })
            .spread(this.prepareData)
            .then(this.validate)
            .then((data: Object) => {
                let model = new this.model(data);

                return model.save();
            })
            .then(this.beforeModelSend);
    });


    /**
     * Method delete the model
     * @type {Function}
     */
    public destroy = APIMethod((req: interfaces.MyRequest) => {
        return Promise.resolve(this.beforeRemove(req.model))
            .then((model: mongoose.Model<any>) => {
                return new Promise((resolve, reject) => {
                    model.remove((error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                })
            });
    });


    /**
     * Method returns single model for the collection according to the query params
     * @type {Function}
     */
    public query = APIMethod((req: interfaces.MyRequest) => {
        var query = req.query,
            pageNumber = parseInt(query.page, 10) || 1,
            limit = parseInt(query.limit, 10) || 10,
            self = this;


        return new Promise((resolve: Function, reject: Function) => {
            self.model.find({})
                .skip((pageNumber - 1) * limit)
                .limit(limit)
                .sort({created_at: 1})
                .exec((err, objects) => {
                    err ? reject(err) : resolve(objects);
                });
        });
    });
}