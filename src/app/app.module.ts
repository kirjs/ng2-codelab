import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {ExerciseComponent} from './codelab/exercise/exercise.component';
import {EditorComponent} from './codelab/editor/editor.component';
import {RunnerComponent} from './runner/runner.component';
import {EditorsComponent} from './codelab/editors/editors.component';
import {CodelabComponent} from './codelab/codelab/codelab.component';
import {MilestoneComponent} from './codelab/milestone/milestone.component';
import {StateService} from './codelab/state.service';
import {TestsComponent} from './tests/tests.component';
import {ReducersService} from './reducers.service';
import {FeedbackWidgetComponent} from './feedback-widget/feedback-widget.component';
import {FeedbackPageComponent} from './feedback-page/feedback-page.component';
import {CodelabConfigService} from '../../exercises/codelab-config-service';
import {AutorunComponent} from './codelab/autorun/autorun.component';
import {MonacoConfigService} from './monaco-config.service';
import {ResizeComponent} from './resize/resize.component';
import {AppConfigService} from './app-config.service';
import {LoopProtectionService} from './loop-protection.service';
import {ScriptLoaderService} from './script-loader.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {CodelabsComponent} from './codelabs/codelabs.component';


let ngModuleConfig = {
  declarations: [
    AppComponent,
    ExerciseComponent,
    EditorComponent,
    RunnerComponent,
    EditorsComponent,
    CodelabComponent,
    CodelabsComponent,
    MilestoneComponent,
    TestsComponent,
    FeedbackWidgetComponent,
    FeedbackPageComponent,
    AutorunComponent,
    ResizeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    StateService,
    ReducersService,
    CodelabConfigService,
    AppConfigService,
    MonacoConfigService,
    LoopProtectionService,
    ScriptLoaderService
  ],
  bootstrap: [AppComponent]
};

@NgModule(ngModuleConfig)
export class AppModule {
}
