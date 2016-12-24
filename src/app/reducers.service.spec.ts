/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {ReducersService} from './reducers.service';
import {MonacoConfigService} from './monaco-config.service';
import {AppConfigService} from './app-config.service';

describe('Service: Reducers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReducersService,
        {provide: MonacoConfigService, useValue: {},
        {provide: AppConfigService, useValue: {}}]
    });
  });

  it('should ...', inject([ReducersService], (service: ReducersService) => {
    expect(service).toBeTruthy();
  }));
});
