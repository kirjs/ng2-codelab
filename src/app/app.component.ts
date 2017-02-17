import { Component } from "@angular/core";
import { StateService } from "./state.service";
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2'; //TODO remove firebase logic from the main component
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

    //retrieve user progress only if it's enabled
    if(appConfig.feedbackEnabled && !appConfig.simulation){
        this.user_progresses = this.angularFire.database.list('/user_progress');
        this.auth = { uid: '' };

        let authObservable = this.angularFire.auth.subscribe((authState) => {
          if (!authState) {
            //not authorized
            this.angularFire.auth.login({
              provider: AuthProviders.Anonymous,
              method: AuthMethods.Anonymous
            }).then(authData => {
              this.auth = authData;
            }).catch(() => {console.log('Authorization failed. Try refreshing the page.')});
          }
          else {
            //authorized
            this.auth = authState;
          }

          //listen for state changes with 10 secs interval (to avoid sending state too often)
          this.state.update.debounceTime(10000).subscribe((state) => {
            if (this.auth.uid) {
              //send state to firebase
              this.user_progresses.update(this.auth.uid, JSON.parse(JSON.stringify(state)));
            }
          });
          authObservable.unsubscribe();
        });
    }
  }
}
