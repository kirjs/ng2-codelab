import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../../../4-component-tree/1-use-video-component/solution/AppComponent';
import {VideoService} from "../../../shared/VideoService";
import {VideoComponent} from "../../../6-children/VideoComponent";
import {TogglePanelComponent} from "../../../shared/TogglePanelComponent";
import {ContextService} from "../../../6-children/ContextService";
import {ContextComponent} from "../../../6-children/ContextComponent";
import {FuzzyPipe} from "../../0-create-pipe/solution/FuzzyPipe";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, VideoComponent, TogglePanelComponent, ContextComponent, FuzzyPipe],
  providers: [VideoService, ContextService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
