import {Component, OnInit} from "@angular/core";
//import {AngularFire, FirebaseListObservable} from "angularfire2";
import {StateService} from "../state.service";

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  //feedbackList: FirebaseListObservable<any[]>;

  constructor(public state: StateService/*, private angularFire: AngularFire*/) {
  }

  listOfFeedbackers = [];

  ngOnInit() {
    /*
    //TODO: use auth property in the state to skip authentication proccess
    this.angularFire.auth.login().then(authState => {
      this.state.setAuth(authState.auth);
    });
    this.feedbackList = this.angularFire.database.list('/feedback');

    this.feedbackList.subscribe(list => {
      let countedFeedbackers = [];
      this.listOfFeedbackers = [];
      list.forEach((val, index) => {
        if (countedFeedbackers.filter(x => x === val.name).length === 0) {
          this.listOfFeedbackers.push(
            {
              numberOfFeedback: list.filter(x => x.name == val.name && countedFeedbackers.filter(x => x === val.name).length == 0).length,
              name: val.name
            }
          );
        }
        countedFeedbackers.push(val.name);
      });
      this.listOfFeedbackers.sort((a, b) => {
        return b.numberOfFeedback - a.numberOfFeedback
      });
    });
    */
  }

  simulate(state) {
    this.state.simulateState(state);
  }
}
