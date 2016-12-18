/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigService]
    });
  });

  it('should ...', inject([AppConfigService], (service: AppConfigService) => {
    expect(service).toBeTruthy();
  }));
});
