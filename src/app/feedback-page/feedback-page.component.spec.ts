/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FeedbackPageComponent} from "./feedback-page.component";
import {mockStateServiceProvider} from "../../mocks/stateService";


describe('FeedbackPageComponent', () => {
  let component: FeedbackPageComponent;
  let fixture: ComponentFixture<FeedbackPageComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackPageComponent],
      providers: [mockStateServiceProvider({})]
    })
      .overrideComponent(FeedbackPageComponent, {set: {template: 'hi'}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
