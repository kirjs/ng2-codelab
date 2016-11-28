import {TestBed} from '@angular/core/testing';
import 'initTestBed';

import {videoCode, thumbsCode} from '../../shared/code';
import {AppModule} from "./AppModule";

import {Api} from '../../shared/Api';

import {ThumbsComponent} from "../../4-z-custom-events/0-add-thumb-component/ThumbsComponent";
import {VideoComponent} from "../../4-component-tree/0-add-video-component/solution/VideoComponent";


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [VideoComponent, ThumbsComponent]
  });
  TestBed.overrideComponent(VideoComponent, {
    set: {
      template: videoCode
    }
  });
  TestBed.overrideComponent(ThumbsComponent, {
    set: {
      template: thumbsCode
    }
  });
  TestBed.compileComponents();
});

describe('Component tree', () => {
  it(`AppModule: Add ThumbsComponent to the AppModule declarations.`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata("annotations", AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].declarations, `Thumbs component not found`).contains(ThumbsComponent);
    chai.expect(metadata[0].declarations, `Keep the app component`).contains(VideoComponent);
  });

  it(`video.html: Use the thumbs component`, () => {
    let fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = Api.fetch('')[0];
    fixture.detectChanges();
    const likes = fixture.componentInstance.video.likes;
    fixture.nativeElement.querySelector('.thumbs-up').click();
    chai.expect(fixture.componentInstance.video.likes).equals(likes + 1);
  });

});

