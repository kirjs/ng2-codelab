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
  remoteStateLoaded = false;
  auth = {uid:''};

  constructor(private state: StateService, private angularFire: AngularFire) {
    this.state.update.debounceTime(500).subscribe((state) => {
      this.currentState = state;
      if(this.auth.uid && this.remoteStateLoaded){
        console.log('setting state to firebase');
        this.user_progresses.update(this.auth.uid, JSON.parse(JSON.stringify(state)));
      }
    });

    let authObservable = this.angularFire.auth.subscribe((authState) => {
      if (!authState) {
        console.log('not authorized');
        this.angularFire.auth.login({ provider: AuthProviders.Anonymous, method: AuthMethods.Anonymous }).then(authData => {
          console.log(authData.uid);
          this.auth = authData;
          this.user_progresses.update(this.auth.uid, this.currentState);
          this.remoteStateLoaded = true;
        });
      }
      else {
        console.log('authorized');
        this.auth = authState;
        let progress = angularFire.database.object('/user_progress/' + this.auth.uid).subscribe((progress) => {
          if (progress) {
            this.remoteStateLoaded = true;
            this.state.simulateState(progress);
          }
        });
      }
      authObservable.unsubscribe();
    });

  }
  ngOnInit() {

  }
}
