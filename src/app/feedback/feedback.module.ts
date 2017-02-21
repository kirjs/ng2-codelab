import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { AngularFireModule, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import {StateService} from '../state.service';
import {FormsModule} from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA",
  authDomain: "ng2-codelab.firebaseapp.com",
  databaseURL: "https://ng2-codelab.firebaseio.com",
  storageBucket: "ng2-codelab.appspot.com"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers:[AngularFire,StateService],
  declarations: [FeedbackWidgetComponent],
  exports: [FeedbackWidgetComponent]
})
export class FeedbackModule { }
