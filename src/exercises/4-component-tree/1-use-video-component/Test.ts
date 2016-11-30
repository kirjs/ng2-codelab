import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from './solution/AppComponent';
import {VideoService} from '../../shared/VideoService';
import {appCode, videoCode} from '../../shared/code';
import {AppModule} from "./AppModule";
import {VideoComponent} from "../0-add-video-component/VideoComponent";
import {Api} from '../../shared/Api';


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent, VideoComponent]
  });
  TestBed.overrideComponent(AppComponent, {
    set: {
      template: appCode
    }
  });
  TestBed.overrideComponent(VideoComponent, {
    set: {
      template: videoCode
    }
  });
  TestBed.compileComponents();
});

describe('Component tree', () => {
  it(`AppModule: Add the VideoComponent to the AppModule declarations.`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata("annotations", AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Video component not found`).contains(VideoComponent);
    chai.expect(metadata[0].declarations, `Keep the app component`).contains(AppComponent);
  });

  it(`app.html: Replace the video html with the video component`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.videos = Api.fetch('');
    // TODO: if the element is added, but the video prop is not present, this test will fail with
    // A useless message. Passing video prop should actually be tested in the next test, and this
    // Ane should pass.
    fixture.detectChanges();

    const myVideos = fixture.nativeElement.querySelectorAll('my-video');
    chai.expect(myVideos.length, `can't find any <my-video> elements in the app component`).is.greaterThan(0);
    chai.expect(myVideos.length, `There should be one my-video element for each element`).equals(fixture.componentInstance.videos.length);
  });

  it(`app.html: Pass the video property to the component (don't forget the square braces)`, () => {
    let fixture = TestBed.createComponent(AppComponent);

    fixture.componentInstance.videos = Api.fetch('');

    fixture.detectChanges();

    const video = fixture.nativeElement.querySelector('my-video');
    chai.expect(video.getAttribute('ng-reflect-video')).equals('[object Object]');
  });
});

