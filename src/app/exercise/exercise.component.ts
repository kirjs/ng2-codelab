import {Component, OnInit, Input} from '@angular/core';
import {FileConfig} from "../file-config";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import { AutorunControlInterface } from "./autoruncontrol.interface" //momo

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input()
  public config: ExerciseConfig;
  private currentAutorunState: AutorunControlInterface = null; //momo
  private changedFiles:any[] = []; //momo

  constructor(private state: StateService) {
  }
  allTestsPass(){
    return exerciseComplete(this.config);
  }

  onCodeChange(changedFile) {

    this.state.updateCode(changedFile);

    // momo
    let state 
    if (this.currentAutorunState.autorun) {
      this.changedFiles = [];   //clear chnaged files array in case any left over from previous manual run
      this.state.updateCode(changedFile);
    }
    else { //manual
      this.changedFiles.push(changedFile);
    }

  }

  //momo
  onAutorunChange(changeAutorun) {

    this.currentAutorunState = changeAutorun;

    if (this.currentAutorunState.running && !this.currentAutorunState.autorun) {

      for (let file in this.changedFiles) {
         console.log(file); // "4", "5", "6"
      }
    }
  }
}
