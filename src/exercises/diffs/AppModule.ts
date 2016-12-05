import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./AppComponent";
/*d:thumbsComponentUse*/
import {ThumbsComponent} from "./ThumbsComponent";
/*/d*//*d:togglePanelComponentUse*/
import {TogglePanelComponent} from "./TogglePanelComponent";
/*/d*//*d:diInjectService*/
import {VideoService} from "./VideoService";
/*/d*//*d:videoComponentUse*/
import {VideoComponent} from "./VideoComponent";
/*/d*//*d:contextComponentUse*/
import {ContextComponent} from "./ContextComponent";
/*/d*//*d:createModuleSolved*/
@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent
    /*/d*//*d:videoComponentUseSolved*/, VideoComponent
    /*/d*//*d:thumbsComponentUseSolved*/, ThumbsComponent
    /*/d*//*d:togglePanelComponentUseSolved*/, TogglePanelComponent
    /*/d*//*d:contextComponentUse*/, ContextComponent
    /*/d*//*d:createModuleSolved*/
  ],
  bootstrap: [
    AppComponent
  ]/*/d*//*d:diInjectServiceSolved*/
  ,
  providers: [VideoService]
  /*/d*//*d:createModuleSolved*/
})
export class AppModule {
  /*/d*/
  /*d:createModuleSolved*/
}
/*/d*/
