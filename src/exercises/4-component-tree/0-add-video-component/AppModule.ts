import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VideoComponent} from "./VideoComponent";
import {AppComponent} from './AppComponent';

@NgModule({
  imports: [BrowserModule],
  declarations: [VideoComponent, AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
