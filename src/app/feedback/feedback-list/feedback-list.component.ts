import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  rawFeedbackList: Array<any> = [];
  currentFeedbackList = [];
  dates:Array<string> = [''];
  selectedDate = '';
  feedbackersCount = {};
  feedbackersNames = [];

  constructor(private angularFire: AngularFire) { }

  ngOnInit() {
    this.angularFire.auth.login().then(authData => {
      this.angularFire.database.list('/feedback').subscribe(list => {
        this.feedbackersCount = {};
        this.feedbackersNames = [];
        list.forEach((val, ind) => {
          if(typeof val.state === 'string')
          {
            val.state = JSON.parse(val.state);
          }
          let stringDate = new Date(val.timestamp).toDateString();
          if(this.dates.indexOf(stringDate) < 0){
            this.dates.push(stringDate);
          }

          this.feedbackersCount[val.name] = this.feedbackersCount[val.name] ? this.feedbackersCount[val.name] + 1 : 1;
        });
        this.feedbackersNames = Object.keys(this.feedbackersCount);
        this.dates.sort((a,b) => {
          return new Date(a).getTime() - new Date(b).getTime();
        });
        this.rawFeedbackList = list;
        this.currentFeedbackList = this.rawFeedbackList;
        this.filterByDate(this.selectedDate);
      });
    });
  }

  filterByDate(date:string){
    this.selectedDate = date;
    this.currentFeedbackList = date ? this.rawFeedbackList.filter(x => new Date(x.timestamp).toDateString() === date) : this.rawFeedbackList;
  }

  simulateFeedback(id){
      var win = window.open(window.location.origin + '/#simulate='+id, '_blank');
      win.focus();
  }
}
