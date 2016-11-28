import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from '../../4-component-tree/1-use-video-component/solution/AppComponent';
import {appCode, videoCode, togglepanelCode, contextCode} from '../../shared/code';
import {VideoComponent} from "../../6-children/VideoComponent";
import {VideoService} from "../../3-dependency-injection/solution/VideoService";
import {TogglePanelComponent} from "../../shared/TogglePanelComponent";
import {ContextComponent} from "../../6-children/solution/ContextComponent";



beforeEach(() => {
  // In Jasmine this is done automatically.
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [VideoComponent, TogglePanelComponent, ContextComponent]
  });


  TestBed.overrideComponent(VideoComponent, {set: {template: videoCode}});
  TestBed.overrideComponent(ContextComponent, {set: {template: contextCode}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: togglepanelCode}});
  TestBed.compileComponents();
});

const video = {
  title: "Cute kitten",
    src: "/assets/images/kitten1.jpg",
  description: "todo",
  views: 100,
  likes: 20,
  date: '2016-11-25'
};

describe('Video', () => {
  it('Video', () => {
    const fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = video;
    fixture.detectChanges();

    chai.expect(fixture.nativeElement.innerHTML).to.contain(`I will fail, because I don't contain what I should`)
  });
});

