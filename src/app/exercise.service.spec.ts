/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExerciseService } from './exercise.service';

describe('Service: Exercise', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseService]
    });
  });

  it('should ...', inject([ExerciseService], (service: ExerciseService) => {
    expect(service).toBeTruthy();
  }));
});
