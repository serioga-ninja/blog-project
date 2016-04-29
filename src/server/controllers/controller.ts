export abstract class Controller {
    private _document:any;


    get fields():Object {
        return this._document;
    }
}