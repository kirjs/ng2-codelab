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
import {Api} from "../shared/Api";

function objectValues(object) {
  return Object.keys(object).reduce((result, key) => {
    result.push(object[key]);
    return result;
  }, []);
}

function objectFindPropOfType(object, Type) {
  return Object.keys(object).reduce((prop, key) => {
    if (prop) return prop;
    if (object[key] instanceof Type) return key;
  }, undefined);
}

function objectHasAn(object, Type) {
  return objectValues(object).some(val => val instanceof Type)
}

const sampleVideo = Api.fetch('')[0];

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
  it(`ContextComponent: Inject the ContextService into the constructor and store it as a property.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, ContextService)).to.be.true;
  });

  it(`ContextComponent: Inject the parent component (VideoComponent) into the constructor and store it as a property.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(objectHasAn(fixture.componentInstance, VideoComponent)).to.be.true;
  });

  it(`ContextComponent: Add an ngOnInit hook`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    chai.expect(fixture.componentInstance.ngOnInit).is.a('function');
  });

  it(`ContextComponent: Call 'getAdText' on the service, and pass it the video 'description' provided by the injected video component. Assign the result to the declared text property.`, () => {
    const fixture = TestBed.createComponent(ContextComponent);
    let componentInstance = fixture.componentInstance;

    let vcProp = objectFindPropOfType(componentInstance, VideoComponent);
    chai.expect(vcProp, `"VideoComponent" was not injected.`).to.not.be.undefined;

    componentInstance[vcProp].video = sampleVideo;
    chai.expect(componentInstance.ngOnInit).is.a('function');
    componentInstance[vcProp].video.description = 'music';
    componentInstance.ngOnInit();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).to.contain('speakers');

    componentInstance[vcProp].video.description = 'banana';
    componentInstance.ngOnInit();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML).to.contain('Check out our web site');
  });

  it(`AppModule: Add the ContextComponent to the AppModule declarations (We did this for you).`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata("annotations", AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Video component not found`).contains(ContextComponent);
  });

  it(`video.html: Actually display the ad.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // TODO: Actually write a test
    //chai.expect(fixture.nativeElement.querySelector('my-ad')).to.be.ok
  });
});

