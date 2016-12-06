import {Component, Input} from "@angular/core";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input() public config: ExerciseConfig;


  constructor(private state: StateService) {
  }

  onCodeChange(changedFile) {
    this.state.updateCode(changedFile);
  }
}
