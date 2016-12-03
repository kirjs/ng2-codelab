/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExerciseService } from './exercise.service';
import {Http} from "@angular/http";
import {Subject} from "rxjs";

describe('Service: Exercise', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExerciseService, {
        provide: Http, useValue: {get: ()=>new Subject()}
      }]
    });
  });

  it('should ...', inject([ExerciseService], (service: ExerciseService) => {
    expect(service).toBeTruthy();
  }));
});
