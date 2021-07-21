import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Post } from 'src/app/post.model'
<<<<<<< HEAD
import { PostService } from './post.service';
=======
>>>>>>> d345981f01068f58a422849d048bcbe1ad95cd6e

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
<<<<<<< HEAD
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
=======
  loadedPosts = [];
  postName:string = '';
  postContent:string = '';

  constructor(private http:HttpClient){}
  ngOnInit(){
    this.fetchPost();
>>>>>>> d345981f01068f58a422849d048bcbe1ad95cd6e
  }

  onCreatePost(postData: Post){
    //Send Http requests
<<<<<<< HEAD
    this.postService.createAndStorePost(postData.title, postData.content)
=======
    this.http.post<{name:string}>('https://ng-complete-guide-560ea-default-rtdb.firebaseio.com/posts.json', postData)
    .subscribe( response => console.log(response))
>>>>>>> d345981f01068f58a422849d048bcbe1ad95cd6e

  }

  onFetchPosts(){
    //Send Http requests
<<<<<<< HEAD
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


=======
    this.fetchPost();
  }

  onClearPosts(){

  }

  private fetchPost(){
    this.http.get<{[key:string] : Post}>('https://ng-complete-guide-560ea-default-rtdb.firebaseio.com/posts.json')
    .pipe(map( responceData => {
      const postArray:Post[] = [];
      for(const key in responceData){
        if(responceData.hasOwnProperty(key)){
          postArray.push({...responceData[key], id:key})
        }
      }
      return postArray;
    }))
    .subscribe(posts => console.log(posts))
  }
>>>>>>> d345981f01068f58a422849d048bcbe1ad95cd6e
}
