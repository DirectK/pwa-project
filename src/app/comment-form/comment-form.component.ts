import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentServiceService } from '../comment-service.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  comment = new Comment();
  submitted = false;

  constructor(private router: Router, private route: ActivatedRoute, private commentService: CommentServiceService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.comment.text = "this doesn't work! :)"
    this.submitted = true;
    this.route.params.subscribe(async params => {
      this.comment.storyid = parseInt(params.storyId);
      this.commentService.addComment(this.comment);
    })
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.comment); }

}
