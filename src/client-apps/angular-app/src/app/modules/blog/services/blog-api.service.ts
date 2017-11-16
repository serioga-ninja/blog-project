import {Injectable} from '@angular/core';
import {IPostModel} from '../../../../../../../server/interfaces/i-post-model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';

@Injectable()
export class BlogApiService {

  private _posts: BehaviorSubject<IPostModel[]>;

  get posts$(): BehaviorSubject<IPostModel[]> {
    return this._posts;
  }

  constructor(private http: Http) {

    this._posts = new BehaviorSubject([]);
  }


  loadPosts(): Promise<any> {
    return this.http.get('http://localhost:3000/api/v1/posts/')
      .map(res => res.json() as IPostModel[])
      .toPromise().then(res => this._posts.next(res));
  }

  createNewPost(formPost: any) {
    return this.http.post('http://localhost:3000/api/v1/posts/', formPost).toPromise();
  }
}
