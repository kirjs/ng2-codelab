import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../4-component-tree/1-use-video-component/solution/AppComponent';
import {VideoService} from "../shared/VideoService";
import {VideoComponent} from "./VideoComponent";
import {TogglePanelComponent} from "../shared/TogglePanelComponent";
import {ContextService} from "./ContextService";
import {ContextComponent} from "./ContextComponent";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, VideoComponent, TogglePanelComponent, ContextComponent],
  providers: [VideoService, ContextService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
