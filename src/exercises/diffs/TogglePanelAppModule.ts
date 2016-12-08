import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ThumbsComponent} from "./thumbs/ThumbsComponent";
import {TogglePanelComponent} from "./TogglePanelComponent";
import {WrapperComponent} from "./WrapperComponent";

@NgModule({
  imports: [BrowserModule],
  declarations: [WrapperComponent,TogglePanelComponent],
  bootstrap: [WrapperComponent]
})
export class AppModule {
}
