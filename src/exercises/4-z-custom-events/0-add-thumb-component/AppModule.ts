import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WrapperComponent} from "./WrapperComponent";
import {ThumbsComponent} from "./ThumbsComponent";

@NgModule({
  imports: [BrowserModule],
  declarations: [ThumbsComponent, WrapperComponent],
  bootstrap: [WrapperComponent]
})
export class AppModule {
}
