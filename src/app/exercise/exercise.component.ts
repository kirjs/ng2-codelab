import {Component, Input} from "@angular/core";
import {StateService} from "../state.service";
import {ExerciseConfig} from "../exercise-config";


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input() public config: ExerciseConfig;
  public presentationMode: boolean;

  constructor(private state: StateService) {
    state.update.subscribe(state => this.presentationMode = state.app.presentationMode);
  }

  onCodeChange(changedFile) {
    this.state.updateCode(changedFile);
  }
}
