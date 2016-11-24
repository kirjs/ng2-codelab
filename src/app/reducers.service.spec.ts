/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReducersService } from './reducers.service';

describe('Service: Reducers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReducersService]
    });
  });

  it('should ...', inject([ReducersService], (service: ReducersService) => {
    expect(service).toBeTruthy();
  }));
});
