import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './AppComponent';
import {VideoService} from "../../shared/VideoService";
import {VideoComponent} from "../../4-component-tree/0-add-video-component/solution/VideoComponent";
import {ThumbsComponent} from "../0-add-thumb-component/solution/ThumbsComponent";


@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, VideoComponent, ThumbsComponent],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
