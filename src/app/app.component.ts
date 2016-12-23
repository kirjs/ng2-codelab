import { Component } from "@angular/core";
import { StateService } from "./state.service";
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import {appConfig} from './app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user_progresses;
  auth;
  constructor(private state: StateService, private angularFire: AngularFire) {
  }

  ngOnInit() {
    if(appConfig.feedbackEnabled){
        this.user_progresses = this.angularFire.database.list('/user_progress');
        this.auth = { uid: '' };

        let authObservable = this.angularFire.auth.subscribe((authState) => {
          if (!authState) {
            console.log('not authorized');
            this.angularFire.auth.login({
              provider: AuthProviders.Anonymous,
              method: AuthMethods.Anonymous
            }).then(authData => {
              console.log(authData.uid);
              this.auth = authData;
            }).catch(() => {console.log('Authorization failed. Try refreshing the page.')});
          }
          else {
            console.log('authorized');
            this.auth = authState;
          }

          this.state.update.debounceTime(500).subscribe((state) => {
            if (this.auth.uid) {
              console.log('setting state to firebase', this.auth.uid);
              this.user_progresses.update(this.auth.uid, JSON.parse(JSON.stringify(state)));
            }
          });
          authObservable.unsubscribe();
        });
    }
  }
}
