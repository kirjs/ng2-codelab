import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class ExerciseService {
  private exercises;

  constructor(private http: Http) {
    this.exercises = http.get('assets/exercises.json')
      .map(response => response.json()).share();
    this.exercises.subscribe(
      () => {
      },
      () => {
        //  node src/gen/prefetch-exercises.js
        debugger
      }
    );

  }

  fetch(file: string) {

    return this.exercises.map(exercises => {
      if (!exercises[file]) {
        debugger
      }
      return exercises[file];

    })
  }
}
