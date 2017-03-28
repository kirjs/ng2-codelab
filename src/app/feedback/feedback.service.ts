import { Injectable } from '@angular/core';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { StateService } from '../codelab/state.service';

@Injectable()
export class FeedbackService {
  getSimulateId(){
    let feedbackId;
    let hashParts = window.location.hash.split('&');
    let simulateIdParameter = hashParts.find(x => x.includes('simulate'));
    if (simulateIdParameter) {
      feedbackId = simulateIdParameter.replace('#simulate=', '');
    }
    return feedbackId;
  }

  constructor(private state: StateService, private angularFire: AngularFire) {
    if(this.getSimulateId())
      return;

    
    let auth = { uid: '' };
    let authObservable = this.angularFire.auth.subscribe((authState) => {
      if (!authState) {
        //not authorized
        this.angularFire.auth.login({
          provider: AuthProviders.Anonymous,
          method: AuthMethods.Anonymous
        }).then(authData => {
          auth = authData;
        }).catch(() => { console.log('Authorization failed. Try refreshing the page.') });
      }
      else {
        //authorized
        auth = authState;
      }

      //listen for state changes with 10 secs interval (to avoid sending state too often)
      this.state.update.debounceTime(10000).subscribe((state) => {
        if (auth.uid) {
          //send state to firebase
          let user_progress = this.angularFire.database.object('/user_progress/' + auth.uid);
          user_progress.set(JSON.stringify(state));
        }
      });
      authObservable.unsubscribe();
    });
  }

  simulateState() {
    let feedbackId = this.getSimulateId();
    if (feedbackId) {
      this.angularFire.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      }).then(authState => {
        //fetch the state from firebase from feedback with given id
        let givenFeedback = this.angularFire.database.object('/feedback/' + feedbackId).subscribe(feedback => {
          console.log('simulating the state of feedback ', feedbackId);
          //simulate the received state
          this.state.simulateState(JSON.parse(feedback.state));
        });
      });
    }
  }

}