import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  sending = false;
  error = null;
  @ViewChild('postForm') postForm:NgForm;

  constructor(private http:HttpClient, private postService:PostService){}
  ngOnInit(){
    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts => {
        this.isFetching = false
        this.loadedPosts = posts
    }, error => {
      
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post){
    //Send Http requests
    
    // this.postService.createAndStorePost(postData.title, postData.content);
      this.postService.createAndStorePost(postData.title, postData.content)
      this.sending = true;
      this.postForm.reset()

  }

    onFetchPosts(){
    //Send Http requests
    this.sending = true;
    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts => {
        this.isFetching = false
        this.loadedPosts = posts
    }, error => {
      this.isFetching = false;
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

  onErrorHandling(){
    this.isFetching = false;
    this.error = null;
  }

}
