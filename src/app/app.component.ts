import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Post } from 'src/app/post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedPosts = [];
  postName:string = '';
  postContent:string = '';

  constructor(private http:HttpClient){}
  ngOnInit(){
    this.fetchPost();
  }

  onCreatePost(postData: Post){
    //Send Http requests
    this.http.post<{name:string}>('https://ng-complete-guide-560ea-default-rtdb.firebaseio.com/posts.json', postData)
    .subscribe( response => console.log(response))

  }

  onFetchPosts(){
    //Send Http requests
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
}
