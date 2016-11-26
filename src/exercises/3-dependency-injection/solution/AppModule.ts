import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './AppComponent';
import {VideoService} from "./VideoService";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
