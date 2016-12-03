/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CodelabComponent} from "./codelab.component";
import {StateService} from "../state.service";
import {MockStateService} from "../../mocks/stateService";

describe('CodelabComponent', () => {
  let component: CodelabComponent;
  let fixture: ComponentFixture<CodelabComponent>;
  let milestone0 = {};

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [CodelabComponent],
      providers: [{
        provide: StateService, useValue: new MockStateService({
          milestones: [milestone0]
        })
      }]
    })
      .overrideComponent(CodelabComponent, {set: {template: 'hello'}})
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create the component, and use the first milestone', () => {
    expect(component).toBeTruthy();
    expect(component.milestone).toEqual(milestone0);
  });
});
