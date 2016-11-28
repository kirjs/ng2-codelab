import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from '../4-component-tree/1-use-video-component/solution/AppComponent';
import {appCode, videoCode, togglepanelCode, contextCode} from '../shared/code';
import {AppModule} from "./AppModule";
import {VideoComponent} from "./VideoComponent";
import {VideoService} from "../shared/VideoService";
import {TogglePanelComponent} from "../shared/TogglePanelComponent";
import {ContextComponent} from "./solution/ContextComponent";
import {ContextService} from "./ContextService";

function objectValues(object) {
  return Object.keys(object).reduce((result, key) => {
    result.push(object[key]);
    return result;
  }, []);
}
let sampleVideo = {
  description: 'Ogogo',
  likes: 1,
  title: 'hi',
  views: 1,
  src: 'todo'
};

function objectHasAn(object, Type) {
  return objectValues(object).some(val => val instanceof Type)
}

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService, ContextService, /* that's a hack, to provide parent component */ VideoComponent],
    declarations: [AppComponent, VideoComponent, TogglePanelComponent, ContextComponent]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: appCode}});
  TestBed.overrideComponent(VideoComponent, {set: {template: videoCode}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: togglepanelCode}});
  TestBed.overrideComponent(ContextComponent, {set: {template: contextCode}});
  TestBed.compileComponents();
});

describe('Children', () => {
  it(`ContextComponent: Inject the ContextService into the constructor and save it in a variable`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, ContextService)).to.be.true;
  });

  it(`ContextComponent: Inject the parent component (VideoComponent) into the constructor and save it in a variable`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, VideoComponent)).to.be.true;
  });

  it(`ContextComponent: Add an ngOnInit hook`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(fixture.componentInstance.ngOnInit).is.a('function');
  });

  it(`ContextComponent: Call 'getAddText' on the service, and pass it the 'description' from parent component video. Set the result as a text property. `, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    fixture.componentInstance.parent.video = sampleVideo;
    chai.expect(fixture.componentInstance.ngOnInit).is.a('function');
    fixture.componentInstance.parent.video.description = 'music';
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).to.contain('speakers');

    fixture.componentInstance.parent.video.description = 'banana';
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).to.contain('Check out our web site');
  });

  it(`AppModule: Add the ContextComponent to the AppModule declarations (We did this for you).`, () => {
    // TODO: Actually write a test
    debugger
  });

  it(`video.html: Actually display the ad.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // TODO: Actually write a test
    //chai.expect(fixture.nativeElement.querySelector('my-ad')).to.be.ok
  });
});

