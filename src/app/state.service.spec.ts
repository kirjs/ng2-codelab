/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {StateService} from './state.service';
import {ReducersService} from "./reducers.service";

describe('Service: State', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
        {provide: ReducersService, useValue: {}}
      ]
    });
  });

  it('should ...', inject([StateService], (service: StateService) => {
    expect(service).toBeTruthy();
  }));
});
