import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './AppComponent';
import {VideoService} from "../../shared/VideoService";
import {VideoComponent} from "./VideoComponent";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, VideoComponent],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
