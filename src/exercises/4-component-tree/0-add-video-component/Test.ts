import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from './solution/AppComponent';
import {VideoService} from './VideoService';
import {appCode, videoCode} from '../../shared/code';
import {AppModule} from "./AppModule";
import {VideoComponent} from "./VideoComponent";
import {VideoItem} from "../../shared/VideoItem";

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
  it(`VideoComponent.ts: Add a video @Input()`, () => {
    const metadata = Reflect.getMetadata("propMetadata", VideoComponent);
    chai.expect(metadata, `VideoComponent doesn't have any @Input()'s`).is.not.undefined;
    chai.expect(Object.keys(metadata).length, `VideoComponent doesn't have any @Input()'s`).equals(1);
    chai.expect(metadata.video, `VideoComponent's @Input()' should be called video.`).is.not.undefined;
  });

  it(`Video.html: Display video title`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    let video = {
      title: 'Super cat',
      src: 'super.png'
    };
    fixture.componentInstance.video = video;
    fixture.detectChanges();

    chai.expect(fixture.nativeElement.innerHTML, `can't find the video title`).contains(video.title);
  });

  it(`Video.html: Display video thumbnail`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    let video: VideoItem = {
      title: 'Super cat',
      src: 'super.png'
    };
    fixture.componentInstance.video = video;
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img');
    chai.expect(image, `Can't find the thumbnal`).is.not.null;
    chai.expect(image.getAttribute('ng-reflect-src')).equals(video.src);
  });
});

