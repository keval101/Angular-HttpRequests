import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Post } from 'src/app/post.model'
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedPosts:Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http:HttpClient, private postService:PostService){}
  ngOnInit(){
    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts => {
        this.isFetching = false
        this.loadedPosts = posts
    }, error => {
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post){
    //Send Http requests
    this.postService.createAndStorePost(postData.title, postData.content)

  }

  onFetchPosts(){
    //Send Http requests
    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts => {
        this.isFetching = false
        this.loadedPosts = posts
    }, error => {
      this.error = error.message;
    });
  }

  onClearPosts(){
    this.postService.deletePost().subscribe(
      (responce) =>{
        this.loadedPosts = [];
      }
    )
  }


}
