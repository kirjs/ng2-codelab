import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import 'initTestBed';
import {togglepanelCode, wrapperCode} from '../../shared/code'
import {TogglePanelComponent} from "./solution/TogglePanelComponent";
import {WrapperComponent} from "./WrapperComponent";

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [TogglePanelComponent, WrapperComponent]
  });
  TestBed.overrideComponent(TogglePanelComponent, {
    set: {
      template: togglepanelCode
    }
  });
  TestBed.compileComponents();
});

describe('Content projection', () => {
  it(`TogglePanelComponent.ts: We added template and selector for you, enjoy!`, () => {
  });

  it(`TogglePanelComponent.ts: Add a boolean flag on the component`, () => {
    let fixture = TestBed.createComponent(TogglePanelComponent);
    // the intent is to let them come up with the property name, so we assume there will be one.
    const props = Object.keys(fixture.componentInstance);

    chai.expect(props.length, `Flag is not defined`).is.not.equal(0);
    chai.expect(props.length, `Too many properties`).is.not.greaterThan(1);
    const prop = props[0];
    chai.expect(fixture.componentInstance[prop], `Flag is not defined`).is.not.undefined;
    chai.expect(fixture.componentInstance[prop], `Flag has to have boolean value`).is.a('boolean');
  });

  it(`togglepanel.html: Use content projection to only display the content with the selector .description by default.`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be displayed`).not.null
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be hidden`).is.null
  });

  it(`togglepanel.html: Add a button to show extra information`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    let buttons = fixture.nativeElement.querySelectorAll('button');
    chai.expect(buttons.length, `Should show exactly one button`).to.equals(1);
  });

  it(`togglepanel.html: When the button is pressed, switch the flag and only display the content with the '.extra' selector.`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be hidden`).is.null
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be displayed`).not.null
  });

  it(`togglepanel.html: Add a button to come back to the description`, () => {
    let fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(fixture.debugElement.query(By.css('.description')), `Description should be displayed`).not.null
    chai.expect(fixture.debugElement.query(By.css('.extra')), `Extra information should be hidden`).is.null
  });
});

