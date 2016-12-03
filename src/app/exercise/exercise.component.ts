import {Component, Input} from '@angular/core';
import {ExerciseConfig} from "../exercise-config";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input()
  public config: ExerciseConfig;
}
