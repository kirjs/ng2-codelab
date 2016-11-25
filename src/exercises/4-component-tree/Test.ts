import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from './solution/AppComponent';
import {VideoService} from './VideoService';
import {appCode, AppComponentCode, videoCode} from './code';
import {AppModule} from "./AppModule";
import {VideoComponent} from "./VideoComponent";

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
  it(`VideoComponent.ts: return videoService.search(results instead of fake data)`, () => {
    const metadata = Reflect.getMetadata("propMetadata", VideoComponent);
    chai.expect(metadata, `VideoComponent doesn't have any @Input()'s`).is.not.undefined;
    chai.expect(Object.keys(metadata).length, `VideoComponent doesn't have any @Input()'s`).equals(1);
    chai.expect(metadata.video, `VideoComponent's @Input()' should be called video.`).is.not.undefined;
  });

  it(`Video.html: return videoService.search(results instead of fake data)`, () => {
    const metadata = Reflect.getMetadata("propMetadata", VideoComponent);
    chai.expect(metadata, `VideoComponent doesn't have any @Input()'s`).is.not.undefined;
    chai.expect(Object.keys(metadata).length, `VideoComponent doesn't have any @Input()'s`).equals(1);
    chai.expect(metadata.video, `VideoComponent's @Input()' should be called video.`).is.not.undefined;
  });


});

