import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from './solution/AppComponent';
import {appCode, videoCode, togglepanelCode} from '../../shared/code';
import {AppModule} from "./AppModule";
import {VideoComponent} from "./VideoComponent";
import {VideoService} from "../../shared/VideoService";
import {TogglePanelComponent} from "./TogglePanelComponent";


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent, VideoComponent, TogglePanelComponent]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: appCode}});
  TestBed.overrideComponent(VideoComponent, {set: {template: videoCode}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: togglepanelCode}});
  TestBed.compileComponents();
});

describe('Component tree', () => {
  it(`AppModule: Add the TogglePanelComponent to the AppModule declarations.`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata("annotations", AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Keep the video component`).contains(VideoComponent);
    chai.expect(metadata[0].declarations, `Keep the app component`).contains(AppComponent);
    chai.expect(metadata[0].declarations, `Add TogglePanelComponent`).contains(TogglePanelComponent);
  });

  it(`AppModule: Add the TogglePanelComponent to the AppModule declarations.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let panel = fixture.nativeElement.querySelector('my-toggle-panel');
    chai.expect(panel).is.not.null
  });


});

