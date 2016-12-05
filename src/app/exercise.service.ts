import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ExerciseService {
  private exercises;
  private fetcher;

  public static exercises;

  constructor(private http: Http) {
    this.fetcher = http.get('assets/exercises.json')
      .map(response => response.json()).subscribe(
        (exercises) => {
          ExerciseService.exercises = exercises;
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
