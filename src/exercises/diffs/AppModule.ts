import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./AppComponent";
/*d:thumbsComponentUse/trimLeading*/
import {ThumbsComponent} from "./thumbs/ThumbsComponent";
/*/d*//*d:togglePanelComponentUse/trimLeading*/
import {TogglePanelComponent} from "./TogglePanelComponent";
/*/d*//*d:diInjectService/trimLeading*/
import {VideoService} from "./VideoService";
/*/d*//*d:videoComponentUse/trimLeading*/
import {VideoComponent} from "./VideoComponent";
/*/d*//*d:contextComponentUse/trimLeading*/
import {ContextComponent} from "./ContextComponent";
/*/d*//*d:fuzzyPipeUse/trimLeading*/
import {FuzzyPipe} from "./FuzzyPipe";
/*/d*//*d:createModuleSolved/trimTrailing*/
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent
    /*/d*//*d:videoComponentUseSolved/trimBoth*/, VideoComponent
    /*/d*//*d:thumbsComponentUseSolved/trimBoth*/, ThumbsComponent
    /*/d*//*d:togglePanelComponentUseSolved/trimBoth*/, TogglePanelComponent
    /*/d*//*d:contextComponentUse/trimBoth*/, ContextComponent
    /*/d*//*d:fuzzyPipeUseSolved/trimBoth*/, FuzzyPipe
    /*/d*//*d:createModuleSolved/trimBoth*/
  ],
  bootstrap: [AppComponent]/*/d*//*d:diInjectServiceSolved/trimTrailing*/,
  providers: [VideoService]
  /*/d*//*d:createModuleSolved/trimTrailing*/
})
export class AppModule {
  /*/d*//*d:createModuleSolved*/
}/*/d*/
