import {TestBed} from '@angular/core/testing';
import {AppComponent} from './__SOLUTION__AppComponent';
import 'initTestBed';
import {videoCode} from './code';

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: [AppComponent]});

  TestBed.overrideComponent(AppComponent, {
    set: {
      template: videoCode
    }
  });
  TestBed.compileComponents();
});

describe('Blabla', () => {
  it(`Add a h1 header with the title variable`, () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h1');
    chai.expect(header, `Can't find any h1 headers`).is.not.null
    chai.expect(header.innerHTML).contains('CatTube');
    fixture.componentInstance.title = 'SomethingElse';
    fixture.detectChanges();

    const header2 = fixture.nativeElement.querySelector('h1');
    chai.expect(header2.innerHTML, `Use the curly braces to put component title property in the header`).contains('SomethingElse');
  });

  it(`Use the new property in the template.`, () => {

  });
});

