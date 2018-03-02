
import { Component, OnInit } from '@angular/core';
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];


  constructor(private service: PostService) {

  }

  private createTitle(input: HTMLInputElement) {
        let post = { title: input.value };
        input.value = '';

        this.service.createPost(post)
          .subscribe( response => {
            post['id'] = response.json().id;
            this.posts.splice(0,0, post);
            console.log(response.json());
          });
  }

  private updatePost(post) {
    this.service.updatePost(post)
    //this.http.(this.url, post)
      .subscribe( response => {
        console.log(response);
      });
  }

  private deletePost(post) {
    this.service.deletePost(post.id)
    //this.http.(this.url, post)
      .subscribe( response => {
        console.log(response);
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      });
  }


  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        console.log(response.json());
        this.posts = response.json();
      });
  }

}
