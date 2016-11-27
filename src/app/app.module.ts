import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {ExerciseComponent} from './exercise/exercise.component';

import {EditorComponent} from './editor/editor.component';
import {RunnerComponent} from './runner/runner.component';
import {EditorsComponent} from './editors/editors.component';
import {CodelabComponent} from './codelab/codelab.component';
import {MilestoneComponent} from './milestone/milestone.component';
import {StateService} from "./state.service";
import { AngularFireModule } from 'angularfire2';
import {TestsComponent} from './tests/tests.component';
import {ReducersService} from "./reducers.service";
import { FeedbackWidgetComponent } from './feedback-widget/feedback-widget.component';

//configuration for firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA",
  authDomain: "ng2-codelab.firebaseapp.com",
  databaseURL: "https://ng2-codelab.firebaseio.com",
  storageBucket: "ng2-codelab.appspot.com"
};

@NgModule({
  declarations: [
    AppComponent,
    ExerciseComponent,
    EditorComponent,
    RunnerComponent,
    EditorsComponent,
    CodelabComponent,
    MilestoneComponent,
    TestsComponent,
    FeedbackWidgetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    StateService,
    ReducersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
