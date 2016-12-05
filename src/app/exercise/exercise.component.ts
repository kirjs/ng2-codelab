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

    // momo

    //if autorun is off save changed files in exercise for batch execution later (click on 'run')
    //otherwise run on each chzaracter input (potenmtially sluggisg since writing to localStorage)
    if (this.currentAutorunState.autorun) { //autorun is ON

      this.state.updateCode(changedFile);

    }
    else { //momo: manual run (autorun is OFF)

      if (changedFile) {

        let foundFileIndex = -1;

        for (var i = 0; i < this.changedFiles.length; i++) {
          if (this.changedFiles[i].file.filename === changedFile.file.filename) {
            foundFileIndex = i;
            this.changedFiles[i] = changedFile; //just update the array index with latest code/file info
            break;
          }
        }

        if (foundFileIndex === -1) {

          this.changedFiles.push(changedFile);
        }

      }
    }

  }

  //momo: act on changes in autorun component
  onAutorunChange(changeAutorun) {

    this.currentAutorunState = changeAutorun; //always update state
    //disregard if run isn't clicked
    if (!this.currentAutorunState.running)
      return;

    for (var i = 0; i < this.changedFiles.length; i++) {
        let changedFile = {file: this.changedFiles[i].file, code: this.changedFiles[i].code}
        this.state.updateCode(changedFile);
    }
    
  }
}
