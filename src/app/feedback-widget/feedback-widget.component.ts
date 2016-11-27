import { Component, OnInit } from '@angular/core';
import {StateService} from "../state.service";

@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {

  constructor(private state: StateService) { }

  ngOnInit() {
  }

  send(comment, username){
    if (comment && username) {
      this.state.sendFeedback({comment,username});
    }    
  }

}
