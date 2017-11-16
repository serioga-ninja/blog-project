import {Component, OnInit} from '@angular/core';
import {BlogApiService} from '../../services/blog-api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public postForm: FormGroup;

  constructor(private blogApiService: BlogApiService,
              private router: Router) {

    this.postForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      authorId: new FormControl('572630c32310063411d4600e')
    });
  }

  ngOnInit() {
  }

  createPost() {
    return this.blogApiService
      .createNewPost(this.postForm.getRawValue())
      .then(() => this.router.navigate(['posts']))
  }

}
