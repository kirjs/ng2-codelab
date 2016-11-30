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
  auth;

  constructor(private state: StateService, private angularFire: AngularFire) {
   
  }
  ngOnInit() {
    let initAuthObservable = this.angularFire.auth.subscribe((authState) => {
      if (authState == null) {
        this.angularFire.auth.login({ provider: AuthProviders.Anonymous, method: AuthMethods.Anonymous }).then(authData => {
          this.auth = authData;
          this.user_progresses.update(authData.uid, {});        
        });
      }
      else {
        this.auth = authState;
        let progressObservable = this.angularFire.database.object('/user_progress/' + this.auth.uid).subscribe((progress) => {
          if (progress) {
            this.state.simulateState(progress);
            progressObservable.unsubscribe();
          }
        });
      }
      initAuthObservable.unsubscribe();
    });


    this.state.update.subscribe((newState) => {
      this.currentState = newState;
      if(this.auth){
        let uid = this.auth.uid;
        this.user_progresses.update(uid, JSON.parse(JSON.stringify(newState)));
      }
    });

  }
}
