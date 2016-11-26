import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {VideoService} from '../../shared/VideoService';
import {videoCode} from '../../shared/code';

import {VideoComponent} from "./solution/VideoComponent";

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [VideoComponent]
  });
  TestBed.overrideComponent(VideoComponent, {
    set: {
      template: videoCode
    }
  });
  TestBed.compileComponents();
});

let video = {
  title: 'Super cat',
  src: 'super.png',
  views: 12000000000,
  description: 'Yes, twelve billion views!!',
  likes: 10000
};

describe('Component tree', () => {
  it(`VideoComponent.ts: Set a selector to be 'my-video'.`, () => {
    const metadata = Reflect.getMetadata("annotations", VideoComponent);
    chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
    chai.expect(metadata[0].selector, `VideoComponent's selector has to be 'my-video'.`).equals('my-video')
  });
  it(`VideoComponent.ts: Set the templateUrl to load appropriate html file.`, () => {
    const metadata = Reflect.getMetadata("annotations", VideoComponent);
    chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
    chai.expect(metadata[0].templateUrl, `VideoComponent's templateUrl should be set to 'video.html'`).equals('video.html')
  });

  it(`VideoComponent.ts: Add a video @Input()`, () => {
    const metadata = Reflect.getMetadata("propMetadata", VideoComponent);
    chai.expect(metadata, `VideoComponent doesn't have any @Input()'s`).is.not.undefined;
    chai.expect(Object.keys(metadata).length, `VideoComponent doesn't have any @Input()'s`).equals(1);
    chai.expect(metadata.video, `VideoComponent's @Input()' should be called video.`).is.not.undefined;
  });

  it(`Video.html: Display video title`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = video;
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML, `can't find the video title`).contains(video.title);
  });


  it(`Video.html: Display video thumbnail`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = video;
    fixture.detectChanges();
    const image = fixture.nativeElement.querySelector('img');
    chai.expect(image, `Can't find the thumbnal`).is.not.null;
    chai.expect(image.getAttribute('ng-reflect-src')).equals(video.src);
  });

  it(`Video.html: Display video description`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = video;
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.description);
  });

  it(`Video.html: Display video likes`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = video;
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.likes);
  });

  it(`Video.html: Display video views`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = video;
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.views);
  });


});

