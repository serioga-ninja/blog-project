import {ICrudControllerInterface} from '../interfaces/i-crud-controller.interface';
import {Request, Response} from 'express';
import * as mongoose from 'mongoose';
import {RouterController} from './router-controller';

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
      .then(model => res.json(model.toObject()));
  }

  public update(req: Request, res: Response): Promise<void | Response> {
    return this.collectData(req.body)
      .then(body => this.prepareModel(body, CrudController.getIdParam(req, this.idAttribute)))
      .then(body => this.validate(body))
      .then(model => this.saveModel(model, false))
      .then(model => res.json(model.toObject()));
  }

  public init() {
    this.router.post(RouterController.buildUrl(), this.create.bind(this));
    this.router.put(RouterController.buildUrl(this.idAttribute), this.update.bind(this));
  }
}
