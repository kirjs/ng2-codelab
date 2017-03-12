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
import {TestsComponent} from './tests/tests.component';
import {ReducersService} from './reducers.service';
import {FeedbackWidgetComponent} from './feedback-widget/feedback-widget.component';
import {FeedbackPageComponent} from './feedback-page/feedback-page.component';
import {CodelabConfigService} from '../../exercises/codelab-config-service';
import {AutorunComponent} from './autorun/autorun.component';
import {MonacoConfigService} from './monaco-config.service';
import {ResizeComponent} from './resize/resize.component';
import {AppConfigService, appConfig} from './app-config.service';
import {LoopProtectionService} from './loop-protection.service';
import {ScriptLoaderService} from './script-loader.service';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'codelab', component: CodelabComponent},
  {path: 'edit', component: CodelabComponent},
  {path: '', redirectTo: '/codelab', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


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
    ResizeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
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
