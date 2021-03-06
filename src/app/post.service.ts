import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  createAndStorePost(title:string, content:string){
    const postData:Post = {title: title, content: content};

    this.http.post<{name:string}>('https://ng-complete-guide-560ea-default-rtdb.firebaseio.com/posts.json', postData)
    .subscribe( response => console.log(response))
  }


  fetchPost(){
    let searchParam = new HttpParams();
    searchParam = searchParam.append( 'print', 'pretty');
    searchParam = searchParam.append( 'custom', 'key');
    
    return this.http.get<{[key:string] : Post}>('https://ng-complete-guide-560ea-default-rtdb.firebaseio.com/posts.json',{
      headers: new HttpHeaders ( { 'Custom-Header' : 'Hello '}),
      params : searchParam
    })
    .pipe(map( responceData => {
      const postArray:Post[] = [];
      for(const key in responceData){
        if(responceData.hasOwnProperty(key)){
          postArray.push({...responceData[key], id:key})
        }
      }
      return postArray;
    }));
  }

  deletePost(){
    return this.http.delete('https://ng-complete-guide-560ea-default-rtdb.firebaseio.com/posts.json')
  }
}

