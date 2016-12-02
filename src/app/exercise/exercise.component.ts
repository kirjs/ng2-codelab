import {Component, OnInit, Input} from '@angular/core';
import {FileConfig} from "../file-config";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input()
  public config: ExerciseConfig;

  constructor(private state: StateService) {
  }
  allTestsPass(){
    return exerciseComplete(this.config);
  }

  onCodeChange(changedFile) {
    this.state.updateCode(changedFile);
  }

  onAutorunChange(changeAutorun) {

    console.log('changed auto run');
  }
}
