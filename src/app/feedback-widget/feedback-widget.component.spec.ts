/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FeedbackWidgetComponent} from "./feedback-widget.component";
import {mockStateServiceProvider} from "../../mocks/stateService";

describe('FeedbackWidgetComponent', () => {
  let component: FeedbackWidgetComponent;
  let fixture: ComponentFixture<FeedbackWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackWidgetComponent],
      providers: [mockStateServiceProvider({})]
    })
      .overrideComponent(FeedbackWidgetComponent, {set: {template: 'hi'}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
