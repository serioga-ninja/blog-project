import * as mongoose from 'mongoose';
import {IErrorResponse} from '../interfaces/i-error-response';

interface ICollectionView {
  objects: mongoose.Document[];
  meta: {
    count: number;
    display: number;
    nextPage: number;
    currentPage: number;
    pageSize: number;
  }
}

export class APIHelper {

  public static errorResponseBody(status: number, message: string, body: any): IErrorResponse {
    return {status, message, body};
  }

  public static buildUrl(uriPart: string, needId: boolean, idAttribute: string, childService: string = ''): string {
    let url = ['/api', 'v1', uriPart];
    if (needId) {
      url.push(':' + idAttribute);
    }
    url.push(childService);

    return url.join('/');
  }

  public static toModelView(model: mongoose.Document): Object {
    return model.toObject();
  }

  public static toCollectionView(collection: mongoose.Document[], limit: number = 0, offset: number = 0, count: number = collection.length): ICollectionView {
    return {
      objects: collection,
      meta: {
        count: count,
        display: count,
        nextPage: limit > 0 ? offset * limit : 0,
        currentPage: limit > 0 ? offset : 0,
        pageSize: limit > 0 ? limit : count
      }
    };
  }
}
