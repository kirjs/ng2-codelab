import { Component, OnInit } from '@angular/core';
import {StateService} from "../state.service";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {

  constructor(private state: StateService, private angularFire: AngularFire) { }

  ngOnInit() {
  }

  send(comment){
    this.state.sendFeedback(comment);
  }

}
