/* tslint:disable:no-unused-variable */
import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {mockStateServiceProvider} from "../mocks/stateService";
import {AngularFire} from "angularfire2";

describe('App: Codelab', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [mockStateServiceProvider({}),
        {provide: AngularFire, useValue: {}}]
    }).overrideComponent(
      AppComponent, {set: {template: 'hi'}});
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
