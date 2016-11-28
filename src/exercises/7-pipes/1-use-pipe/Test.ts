import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from '../../4-component-tree/1-use-video-component/solution/AppComponent';
import {appCode, videoCode, togglepanelCode, contextCode} from '../../shared/code';
import {AppModule} from "./AppModule";
import {VideoComponent} from "../../6-children/VideoComponent";
import {VideoService} from "../../shared/VideoService";
import {TogglePanelComponent} from "../../shared/TogglePanelComponent";
import {ContextComponent} from "../../6-children/solution/ContextComponent";
import {ContextService} from "../../6-children/ContextService";
import {Api} from "../../shared/Api";
import {FuzzyPipe} from "../0-create-pipe/solution/FuzzyPipe";

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
    declarations: [AppComponent, VideoComponent, TogglePanelComponent, ContextComponent, FuzzyPipe]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: appCode}});
  TestBed.overrideComponent(VideoComponent, {set: {template: videoCode}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: togglepanelCode}});
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
    chai.expect(metadata[0].declarations, `Video component not found`).contains(FuzzyPipe);
  });

  it(`video.html: Use the pipe on the date.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML).contains(sampleFuzzy(sampleVideo.date));
  });
});

