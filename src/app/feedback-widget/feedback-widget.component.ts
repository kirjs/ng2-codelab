import {Component, OnInit} from '@angular/core';
import {StateService} from '../state.service';

@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {
  open: false;
  username: string = "";
  comment: string = "";

  constructor(private state: StateService) {
  }

  ngOnInit() {
    this.state.update.subscribe(state => this.username = state.local.user);
  }

  send() {
    if (this.comment && this.username) {
      let comment = this.comment;
      let username = this.username;
      this.state.sendFeedback({comment, username});
      this.comment = '';
    }
  }
}
