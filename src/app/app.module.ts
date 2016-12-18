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
import {StateService} from './state.service';
import {AngularFireModule, AuthProviders, AuthMethods, AngularFire} from 'angularfire2';
import {TestsComponent} from './tests/tests.component';
import {ReducersService} from './reducers.service';
import {FeedbackWidgetComponent} from './feedback-widget/feedback-widget.component';
import {FeedbackPageComponent} from './feedback-page/feedback-page.component';
import {ExerciseService} from './exercise.service';
import {CodelabConfigService} from '../../exercises/codelab-config-service';
import {AutorunComponent} from './autorun/autorun.component';
import {MonacoConfigService} from './monaco-config.service';
import {ResizeComponent} from './resize/resize.component';
import {AppConfigService, appConfig} from './app-config.service';

let ngModuleConfig = {
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
    FeedbackPageComponent,
    AutorunComponent,
    ResizeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    StateService,
    ReducersService,
    ExerciseService,
    CodelabConfigService,
    AppConfigService,
    MonacoConfigService
  ],
  bootstrap: [AppComponent]
};

// We use firebase for the feedback. If it's disabled, we should do no extra network requests.
if (appConfig.feedbackEnabled) {
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

  ngModuleConfig.imports.push(AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig) as any)
} else {
  @NgModule({
    providers: [{provide: AngularFire, useValue: {}}]
  })
  class FakeAngularFileModule {
  }

  ngModuleConfig.imports.push(FakeAngularFileModule);
}


@NgModule(ngModuleConfig)
export class AppModule {
}
