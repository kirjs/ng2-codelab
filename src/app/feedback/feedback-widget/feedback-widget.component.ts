import {Component, OnInit} from '@angular/core';
import {AngularFireModule, AuthProviders, AuthMethods, AngularFire} from 'angularfire2';
import {StateService} from '../../codelab/state.service';

@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {
  open: false;
  username: string = "";
  comment: string = "";

  constructor(private angularFire: AngularFire, private state: StateService) {
  }

  ngOnInit() {
    //TODO retrieve username from state.local.user
  }

  send() {
    if (this.comment && this.username) {
      let comment = this.comment;
      let username = this.username;
      let observable = this.state.update.take(1).subscribe(state => {
        let items = this.angularFire.database.list('/feedback');
        items.push({
          comment,
          state: JSON.stringify(state),
          name: username,
          timestamp: new Date().getTime()
        });
        this.comment = '';
        //TODO set username in state.local.user
      });
    }
  }
}
