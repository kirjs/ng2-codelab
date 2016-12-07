import {TestBed} from "@angular/core/testing";
import "initTestBed";
import {AppComponent} from "./AppComponent";
import {appCode, videoCode, togglePanelCode, contextCode, thumbsCode} from "./code";
import {AppModule} from "./AppModule";
import {VideoComponent} from "./VideoComponent";
import {VideoService} from "./VideoService";
import {TogglePanelComponent} from "./TogglePanelComponent";
import {ContextComponent} from "./ContextComponent";
import {ContextService} from "./ContextService";
import {Api} from "./Api";
import {FuzzyPipe} from "./FuzzyPipe";
import {ThumbsComponent} from "./ThumbsComponent";

function objectValues(object) {
  return Object.keys(object).reduce((result, key) => {
    result.push(object[key]);
    return result;
  }, []);
}
const sampleVideo = Api.fetch('')[0];

function objectHasAn(object, Type) {
  return objectValues(object).some(val => val instanceof Type)
}

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService, ContextService, /* that's a hack, to provide parent component */ VideoComponent],
    declarations: [AppComponent, VideoComponent, ThumbsComponent, TogglePanelComponent, ContextComponent, FuzzyPipe]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: appCode}});
  TestBed.overrideComponent(VideoComponent, {set: {template: videoCode}});
  TestBed.overrideComponent(ThumbsComponent, {set: {template: thumbsCode}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: togglePanelCode}});
  TestBed.overrideComponent(ContextComponent, {set: {template: contextCode}});
  TestBed.compileComponents();
});
function sampleFuzzy(value) {
  let date = new Date(value);
  let dateNow = new Date();
  let millisecondsDifference = dateNow.getTime() - date.getTime();
  let differenceDays = Math.floor(millisecondsDifference / (1000 * 3600 * 24));
  return differenceDays + ' days';
}

describe('Pipes', () => {


  it(`AppModule: Add the FuzzyPipe to the AppModule declarations`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata("annotations", AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Fuzzy pipe not found`).contains(FuzzyPipe);
  });

  it(`video.html: Use the pipe on the date.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML).contains(sampleFuzzy(sampleVideo.date));
  });
});

