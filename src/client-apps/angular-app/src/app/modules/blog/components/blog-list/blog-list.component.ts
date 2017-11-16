import {Component, OnInit} from '@angular/core';
import {BlogApiService} from '../../services/blog-api.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  get posts$() {
    return this.blogApiService.posts$;
  }

  constructor(private blogApiService: BlogApiService) {
  }

  ngOnInit() {
    this.blogApiService.loadPosts();
  }

}
