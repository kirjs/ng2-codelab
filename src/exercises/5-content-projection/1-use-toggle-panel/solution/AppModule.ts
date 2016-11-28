import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './AppComponent';
import {VideoService} from "../../../shared/VideoService";
import {VideoComponent} from "../VideoComponent";
import {TogglePanelComponent} from "../../0-add-toggle-panel-component/TogglePanelComponent";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, VideoComponent, TogglePanelComponent],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
