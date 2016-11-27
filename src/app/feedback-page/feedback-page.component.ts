import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {StateService} from "../state.service";

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  feedbackList:FirebaseListObservable<any[]>;
  constructor(public state: StateService, private angularFire: AngularFire) { }

  ngOnInit() {
    //TODO: use auth property in the state to skip authentication proccess
    this.angularFire.auth.login().then(authState => {
      this.state.setAuth(authState.auth);
    });
    this.feedbackList = this.angularFire.database.list('/feedback');
  }

  simulate(state){
    this.state.simulateState(state);
  }

}
