import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {AppComponent} from './solution/AppComponent';
import {appCode, videoCode, togglepanelCode, contextCode} from '../shared/code';
import {AppModule} from "./AppModule";
import {VideoComponent} from "./VideoComponent";
import {VideoService} from "../shared/VideoService";
import {TogglePanelComponent} from "../shared/TogglePanelComponent";
import {ContextComponent} from "./ContextComponent";
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

  it(`ContextComponent: Set component description based on the service result.`, () => {
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

  it(`AppModule: Add the TogglePanelComponent to the AppModule declarations.`, () => {
    const fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = sampleVideo;
    fixture.detectChanges();
  });
});

