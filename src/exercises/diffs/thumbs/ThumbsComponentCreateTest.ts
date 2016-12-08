import {TestBed} from '@angular/core/testing';
import 'initTestBed';
import {thumbs_thumbs_html} from '../code';
import {Api} from '../Api'
import {ThumbsComponent, Thumbs} from "./ThumbsComponent";
const thumbs = Api.fetch('')[0];

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [ThumbsComponent]
  });

  TestBed.overrideComponent(ThumbsComponent, {
    set: {
      template: thumbs_thumbs_html
    }
  });
  TestBed.compileComponents();
});

describe('Component tree', () => {
  describe('Make sure things are displayed properly', () => {
    let fixture;
    beforeEach(() => {
      fixture = TestBed.createComponent(ThumbsComponent);
      fixture.detectChanges();
    });

    it(`thumbs.html: Add a button with a 'thumbs-up' class.`, () => {
      chai.expect(fixture.nativeElement.querySelector('.thumbs-up'), `can't find thumbs up button`).to.be.ok
    });

    it(`thumbs.html: Add a button with a 'thumbs-down' class.`, () => {
      chai.expect(fixture.nativeElement.querySelector('.thumbs-up'), `can't find thumbs up button`).to.be.ok
    });
  });

  describe('Make sure things work', () => {
    it(`ThumbsComponent.ts: Set a selector to be 'my-thumbs'.`, () => {
      const metadata = Reflect.getMetadata("annotations", ThumbsComponent);
      chai.expect(metadata, `ThumbsComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].selector, `ThumbsComponent's selector has to be 'my-thumbs'.`).equals('my-thumbs')
    });

    it(`ThumbsComponent.ts: Set the templateUrl to load appropriate html file.`, () => {
      const metadata = Reflect.getMetadata("annotations", ThumbsComponent);
      chai.expect(metadata, `ThumbsComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].templateUrl, `ThumbsComponent's templateUrl should be set to './thumbs.html'`).equals('./thumbs.html')
    });

    it(`ThumbsComponent.ts: Add a @Output() called 'onThumbs'`, () => {
      const metadata = Reflect.getMetadata("propMetadata", ThumbsComponent);
      chai.expect(metadata, `ThumbsComponent doesn't have any @Outputs()'s`).is.not.undefined;
      chai.expect(Object.keys(metadata).length, `ThumbsComponent doesn't have any @Outputs()'s`).equals(1);
      chai.expect(metadata.onThumbs, `ThumbsComponent's @Outputs()' should be called onThumbs.`).is.not.undefined;
    });
  });

  describe('Make sure things work', () => {
    it(`ThumbsComponent.ts, thumbs.html: Set a selector to be 'my-thumbs'.`, () => {
      const metadata = Reflect.getMetadata("annotations", ThumbsComponent);
      chai.expect(metadata, `ThumbsComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].selector, `ThumbsComponent's selector has to be 'my-thumbs'.`).equals('my-thumbs')
    });
  });

  describe('Make sure things are displayed properly', () => {
    let fixture;
    beforeEach(() => {
      fixture = TestBed.createComponent(ThumbsComponent);
      fixture.detectChanges();
    });

    it(`thumbs.html: Make the 'thumbs-up' button emit the onThumbs event with the correct thums. Use the ENUM!`, () => {
      let thumbs;
      fixture.componentInstance.onThumbs.subscribe((event) => {
        thumbs = event;
      });
      chai.expect(thumbs, `OnThumbs was called without pressing the button`).to.be.not.ok;
      fixture.nativeElement.querySelector('.thumbs-up').click();
      chai.expect(thumbs, `OnThumbs was not called when pressing the button with the 'thumbs-up' class.`).to.equal(Thumbs.UP);
    });

    it(`thumbs.html: Make the 'thumbs-down' button emit the onThumbs event with the correct thums. Use the ENUM!`, () => {
      let thumbs;
      fixture.componentInstance.onThumbs.subscribe((event) => {
        thumbs = event;
      });
      chai.expect(thumbs, `OnThumbs was called without pressing the button`).to.be.not.ok;
      fixture.nativeElement.querySelector('.thumbs-down').click();
      chai.expect(thumbs, `OnThumbs was not called when pressing the button with the 'thumbs-down' class.`).to.equal(Thumbs.DOWN);
    });

  });

});

