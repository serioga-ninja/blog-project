import {Router} from 'express';

export abstract class RouterController {

  public static buildUrl(idAttribute?: string, childService?: string): string {
    idAttribute = !!idAttribute ? ':' + idAttribute : null;
    return '/' + [idAttribute, childService]
      .filter(str => !!str)
      .join('/');
  }

  router: Router;

  constructor() {
    this.router = Router();
  }

  public abstract init(): void;
}
