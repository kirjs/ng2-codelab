import {Injectable} from "@angular/core";

const exercises = require('../assets/exercises.json');
import * as assert from 'assert';



@Injectable()
export class ExerciseService {
  private readonly exercises = exercises;
  getExercise(path){
    assert(this.exercises[path], `Exercise doesn't exist.`);
    return this.exercises[path];
  }
}
