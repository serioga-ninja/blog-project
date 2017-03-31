declare namespace BlogProject {
  export module Controller {
    export interface methodObj {
      method: Function,
      type: string,
      withId: boolean,
      uriPart: string,
      middleware: Array<Function>
    }

    export interface controller {
      urlPart: string;
      idAttribute?: string;
    }
  }
}
