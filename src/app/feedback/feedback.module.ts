import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { ProgressComponent } from './progress/progress.component';
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
  declarations: [FeedbackWidgetComponent, FeedbackListComponent, ProgressComponent],
  exports: [FeedbackWidgetComponent, FeedbackListComponent, ProgressComponent]
})
export class FeedbackModule { }
