import {TestBed} from '@angular/core/testing';
import {AppComponent} from './solution/AppComponent';
import 'initTestBed';
import {appCode} from './code';

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: [AppComponent]});

  TestBed.overrideComponent(AppComponent, {
    set: {
      template: appCode
    }
  });
  TestBed.compileComponents();
});

describe('Blabla', () => {
  it(`AppComponent.ts: Add 'videos' property, set the value as empty array.`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    chai.expect(fixture.componentInstance.videos, `No videos property on the component`).is.not.undefined
    chai.expect(fixture.componentInstance.videos, `Videos property on the component is not an array.`).is.an('array');
  });

  it(`AppComponent.ts: Add 'search' method on the component.`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    chai.expect(fixture.componentInstance.search, `Search should be a function`).is.a('function');
    chai.expect(fixture.componentInstance.search.length, `Search should take one parameter`).equals(1);
  });

  it(`app.html: Add click handler to the button, call 'search' method and pass input value `, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    const button = fixture.nativeElement.querySelector('button');


    function testSearch(searchString) {
      let passedValue = undefined;
      let called = false;
      fixture.componentInstance.search = function (value) {
        called = true;
        passedValue = value;
      };

      input.value = searchString;
      button.click();
      chai.expect(called, `Search function should be called when the search button is pressed`).equals(true);
      chai.expect(passedValue, `Input value is not passed to the search function`).equals(input.value)
    }

    testSearch('Awesome kittens');
    testSearch('Other value');
  });

  it(`app.html: Add a message saying 'No videos' which is displayed only when the videos array is empty`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.videos = [];
    chai.expect(fixture.nativeElement.innerHTML.toLowerCase()).contains('no videos');

    fixture.componentInstance.videos = [1];
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.innerHTML.toLowerCase()).not.contains('no videos');
  });


});

