/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RunnerComponent} from "./runner.component";
import {StateService} from "../state.service";
import {Subject} from "rxjs";

describe('RunnerComponent', () => {
  let component: RunnerComponent;
  let fixture: ComponentFixture<RunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RunnerComponent],
      providers: [{
        provide: StateService, useValue: {
          update: new Subject(),
          ping: () => {
          }
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
