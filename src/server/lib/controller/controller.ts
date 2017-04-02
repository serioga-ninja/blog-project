import * as mongoose from 'mongoose';
import * as express from 'express';
import {APIMethod} from "../api-method";
import {APIHelper} from "../../helpers/api";
import * as Promise from "bluebird";
import * as interfaces from "../../interfaces";
import {Mongoose} from "mongoose";
import {ERROR_MESSAGES} from "../../helpers/messages";
import {NotFound} from "../api-error";
import methodObj = BlogProject.Controller.methodObj;


export abstract class BaseController {

}

export class ApiController<T extends mongoose.Model<any>> extends BaseController implements BlogProject.Controller.controller {
  urlPart: string; // the part of url which /api/v1/:urlPart/bla-bla
  idAttribute: string = '_id';
  // id attribute, or how we should looking for the entities

  public static bind(fn: Function, scope: Object) {
    return APIMethod(function (...args) {
      return fn.apply(scope, args);
    })
  }

  constructor(private model?: mongoose.Model<any>) {
    super();
    // TODO: move middleware to decorators
  }

  /**
   * Method registers all api methods for the current router
   * @param app
   */
  public register(app) {
    app.get(APIHelper.buildUrl(this.urlPart, true, this.idAttribute, ''), [ApiController.bind(this.single, this)]);
    app.get(APIHelper.buildUrl(this.urlPart, false, this.idAttribute, ''), [ApiController.bind(this.query, this)]);
    app.post(APIHelper.buildUrl(this.urlPart, false, this.idAttribute, ''), [ApiController.bind(this.create, this)]);
    app.put(APIHelper.buildUrl(this.urlPart, true, this.idAttribute, ''), [ApiController.bind(this.save, this)]);
    app.delete(APIHelper.buildUrl(this.urlPart, true, this.idAttribute, ''), [ApiController.bind(this.destroy, this)]);
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
   * @param {express.Request} request
   * @param {boolean} [isNew=true]
   * @returns {Object}
   */
  protected prepareData(request: express.Request, isNew: boolean = false) {
    return request.body;
  }

  protected validate(data: Object) {
    return data;
  }

  protected beforeSave(model: mongoose.Document) {
    return model;
  }

  protected prepareModel(model, data: Object) {
    return model.set(data);
  }

  protected afterCreate(model) {
    return model;
  }

  public preload(id) {
    let search = {};
    search[this.idAttribute] = id;
    return new this.model()
      .findOne(search)
      .exec()
      .then((entity) => {
        if (!entity) {
          throw new NotFound(ERROR_MESSAGES.not_found);
        }
        return entity;
      })
  }

  public afterSave() {
    // TODO
  }

  public beforeRemove(model: mongoose.Document) {
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
  public single = (req: interfaces.MyRequest) => {
    let search = {};
    search[this.idAttribute] = req.params[this.idAttribute];
    return Promise.resolve(this.beforeModelSend(req.model))
  };

  /**
   * Method saves single model
   * @type {Function}
   */
  public save = (req: interfaces.MyRequest) => {
    let id = req.params[this.idAttribute];

    return Promise
      .bind(this)
      .then(() => {
        return this.prepareData(req, false);
      })
      .then(this.validate)
      .then((data) => {
        return this.preload(id)
          .then((model) => {
            return this.prepareModel(model, data);
          });
      })
      .then(this.beforeSave)
      .then((model) => {
        return model.save();
      })
      .then(this.beforeModelSend);
  };

  /**
   * Method creates single model
   * @type {Function}
   */
  public create = (req: interfaces.MyRequest) => {
    return Promise.resolve(this.prepareData(req, true))
      .then((body) => {
        return this.validate(body);
      })
      .then((data) => {
        return this.prepareModel(new this.model(), data);
      })
      .then((model) => {
        return this.beforeSave(model);
      })
      .then((model) => {
        return model.save();
      })
      .then((model) => {
        return this.afterCreate(model);
      })
      .then((model) => {
        return this.beforeModelSend(model);
      });
  };


  /**
   * Method delete the model
   * @type {Function}
   */
  public destroy = (req: interfaces.MyRequest) => {
    return Promise.resolve(this.beforeRemove(req.model))
      .then((model: mongoose.Document) => {
        return model.remove();
      });
  };


  /**
   * Method returns single model for the collection according to the query params
   * @type {Function}
   */
  public query = (req: interfaces.MyRequest) => {
    let query = req.query,
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
  };
}
