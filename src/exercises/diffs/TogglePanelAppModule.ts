import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {TogglePanelComponent} from "./toggle-panel/TogglePanelComponent";
import {WrapperComponent} from "./WrapperComponent";

@NgModule({
  imports: [BrowserModule],
  declarations: [WrapperComponent, TogglePanelComponent],
  bootstrap: [WrapperComponent]
})
export class AppModule {
}
