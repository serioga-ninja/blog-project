/**
 * Created by serioga on 03.08.16.
 */
import mongoose = require('mongoose');

export function buildUrl(uriPart:string, needId:boolean, idAttribute:string):string {
    if (!needId)
        return '/api/v1/' + uriPart;
    else
        return '/api/v1/' + uriPart + '/:' + idAttribute;
}

export function toModelView(model:mongoose.Document):Object {
    return model.toObject();
}

export function toCollectionView(collection:mongoose.Document[], limit:number = 0, offset:number = 0, count:number = collection.length):Object {
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