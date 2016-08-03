/**
 * Created by serioga on 03.08.16.
 */


export function buildUrl(uriPart:string, needId:boolean):string {
    if (!needId)
        return '/api/v1/' + uriPart;
    else
        return '/api/v1/' + uriPart + '/:id';
}