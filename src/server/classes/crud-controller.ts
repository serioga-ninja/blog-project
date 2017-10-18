import {ICrudControllerInterface} from '../interfaces/i-crud-controller.interface';
import {Request, Response} from 'express';
import * as mongoose from 'mongoose';
import {RouterController} from './router-controller';
import {RoutingHandlerDecorator, routingHandlerFactory} from '../lib/routing-handler.decorator';
import {NotFound} from '../lib/api-error';

export abstract class CrudController<T> extends RouterController implements ICrudControllerInterface {

  public static getIdParam(req: Request, idAttribute: string): string {
    return req.query[idAttribute] || req.body[idAttribute] || req.params[idAttribute];
  }

  abstract urlPart: string;
  abstract idAttribute: string;
  abstract model: mongoose.Model<mongoose.Document>;

  protected collectData(body: object): Promise<object> {
    return Promise.resolve(body);
  }

  protected validate(model: mongoose.Document): Promise<mongoose.Document> {
    return new Promise((resolve, reject) => {
      model.validate((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(model);
        }
      });
    });
  }

  protected beforeSend(model: mongoose.Document): Promise<any> {
    return Promise.resolve(model);
  }

  protected prepareModel(body: object, id?: string | number): Promise<mongoose.Document> {
    if (!id) {
      return Promise.resolve(new this.model(body));
    }

    return this.model
      .findOne({[this.idAttribute]: id})
      .then(model => {
        model.set(body);
        return model;
      });
  }

  protected saveModel(model: mongoose.Document, isNew: boolean = true): Promise<any> {
    return model.save();
  }

  public create(req: Request, res: Response): Promise<void | Response> {
    return this.collectData(req.body)
      .then(body => this.prepareModel(body))
      .then(body => this.validate(body))
      .then(model => this.saveModel(model))
      .then(model => this.beforeSend(model))
      .then(model => res.json(model.toObject()));
  }

  public update(req: Request, res: Response): Promise<void | Response> {
    return this.collectData(req.body)
      .then(body => this.prepareModel(body, CrudController.getIdParam(req, this.idAttribute)))
      .then(body => this.validate(body))
      .then(model => this.saveModel(model, false))
      .then(model => this.beforeSend(model))
      .then(model => res.json(model.toObject()));
  }

  public getOne(req: Request, res: Response): Promise<void | Response> {
    return this.model
      .findOne({[this.idAttribute]: CrudController.getIdParam(req, this.idAttribute)})
      .then(model => {
        if (!model) {
          throw new NotFound('Content not found');
        }

        return model;
      })
      .then(model => this.beforeSend(model))
      .then(model => res.json(model.toObject()));
  }

  public query(req: Request, res: Response): Promise<void | Response> {
    let {page, limit, sortBy, sortDirection, ...filterParams} = req.query;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    sortBy = sortBy || 'created_at';
    sortDirection = sortDirection || 1;

    let filterQuery = this.model.find(filterParams)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({[sortBy]: sortDirection});

    return filterQuery
      .then((collection) => collection)
      .then(collection => res.json(collection));
  }

  public removeOne(req: Request, res: Response): Promise<void | Response> {
    let id = CrudController.getIdParam(req, this.idAttribute);

    return this.model
      .findByIdAndRemove(id)
      .then(() => res.sendStatus(204));
  }

  public init() {
    this.router.post(RouterController.buildUrl(), routingHandlerFactory(this.create, this));
    this.router.get(RouterController.buildUrl(), routingHandlerFactory(this.query, this));
    this.router.put(RouterController.buildUrl(this.idAttribute), routingHandlerFactory(this.update, this));
    this.router.get(RouterController.buildUrl(this.idAttribute), routingHandlerFactory(this.getOne, this));
    this.router.delete(RouterController.buildUrl(this.idAttribute), routingHandlerFactory(this.removeOne, this));
  }
}
