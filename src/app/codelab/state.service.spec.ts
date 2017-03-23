/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {StateService} from './state.service';
import {ReducersService} from '../reducers.service';
import {CodelabConfigService} from '../../../exercises/codelab-config-service';
import {AppConfigService} from '../app-config.service';

// TODO: Fix this failing test suite.
xdescribe('Service: State', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
        {provide: ReducersService, useValue: {}},
        {provide: CodelabConfigService, useValue: {}},
        {provide: AppConfigService, useValue: {}}
      ]
    });
  });

  it('should ...', inject([StateService], (service: StateService) => {
    expect(service).toBeTruthy();
  }));
});
