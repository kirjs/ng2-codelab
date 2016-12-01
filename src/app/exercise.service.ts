import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

const fakeExercises = {};
@Injectable()
export class ExerciseService {
  private exercises;

  constructor(private http: Http) {
    http.get('assets/exercises.json')
      .map(response => response.json()).subscribe(
      (exercises) => {
        this.exercises = exercises;
      },
      () => {
        //  node src/gen/prefetch-exercises.js
        debugger
      }
    );

  }

  fetch(file: string) {
    return this.exercises[file];
  }
}
