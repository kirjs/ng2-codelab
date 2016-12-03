/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {ReducersService} from "./reducers.service";
import {ExerciseService} from "./exercise.service";
import {AngularFire} from "angularfire2";

describe('Service: Reducers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReducersService,
        {
          provide: ExerciseService, useValue: {},
        },
        {
          provide: AngularFire, useValue: {},
        }
      ]
    });
  });

  it('should ...', inject([ReducersService], (service: ReducersService) => {
    expect(service).toBeTruthy();
  }));
});
