import { Component } from "@angular/core";
import { StateService } from "./state.service";
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import {appConfig} from './app-config.service';

//helper function to get #simulate_id parameter from URL
const getSimulateId = (urlHash) => {
  let hashParts = urlHash.split('&');
  let simulateIdParameter = hashParts.find(x => x.includes('simulate'));
  if(simulateIdParameter){
   return simulateIdParameter.replace('#simulate=',''); 
  }
};

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
    //check if #simulate_id parameter was passed to url
    if(getSimulateId(window.location.hash)){
      let feedbackId = getSimulateId(window.location.hash);
      //log in using google account in order to check if user has rights to simulate feedback
      this.angularFire.auth.login().then(authState => {
        //fetch the state from firebase from feedback with given id
        let givenFeedback = this.angularFire.database.object('/feedback/' + feedbackId).subscribe(feedback => {
          console.log('simulating the state of feedback ', feedbackId);
          //simulate the received state
          this.state.simulateState(feedback.state);
        });
      });
    }
    if(appConfig.feedbackEnabled && !appConfig.simulation){
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
