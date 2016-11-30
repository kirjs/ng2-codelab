import { Component } from '@angular/core';
import { StateService } from "./state.service";
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user_progresses = this.angularFire.database.list('/user_progress');
  currentState = {};
  auth = {uid:''};

  constructor(private state: StateService, private angularFire: AngularFire) {
    this.state.update.debounceTime(500).subscribe((state) => {
      this.currentState = state;
      if(this.auth.uid){
        this.user_progresses.update(this.auth.uid, JSON.parse(JSON.stringify(state)));
      }
    });

    this.angularFire.auth.subscribe((authState) => {
      if (!authState) {
        this.angularFire.auth.login({ provider: AuthProviders.Anonymous, method: AuthMethods.Anonymous }).then(authData => {
          this.auth = authData;
          this.user_progresses.update(authData.uid, {});
        });
      }
      else {
        this.auth = authState;
        let progress = angularFire.database.object('/user_progress/' + this.auth.uid).remove();
        progress.then((progress) => {
          if (progress) {
            this.state.simulateState(progress);
          }
        }).catch(() => {
          console.log(`can't recover progress`);
        });
      }
    });


  }
  ngOnInit() {

  }
}
