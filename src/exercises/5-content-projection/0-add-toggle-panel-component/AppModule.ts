import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TogglePanelComponent} from "./TogglePanelComponent";
import {WrapperComponent} from "./WrapperComponent";

@NgModule({
  imports: [BrowserModule],
  declarations: [TogglePanelComponent, WrapperComponent],
  bootstrap: [WrapperComponent]
})
export class AppModule {
}
