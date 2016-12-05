import {Component, OnInit, Input} from '@angular/core';
import {FileConfig} from "../file-config";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import { AutorunControlInterface } from "./autoruncontrol.interface" 

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input()
  public config: ExerciseConfig;
  private currentAutorunState: AutorunControlInterface = null; 
  private changedFiles:any[] = []; 

  constructor(private state: StateService) {
  }
  
  allTestsPass(){
    return exerciseComplete(this.config);
  }

  onCodeChange(changedFile) {

    if (this.currentAutorunState.autorun) { //autorun is ON

      this.state.updateCode(changedFile);

    }
    else { //manual run (autorun is OFF)--accumalte changed files

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

  //TODO_MOMO:  perhsps pass intp autoruncontrol as @Input
  onAutorunChange(changeAutorun) {

    this.currentAutorunState = changeAutorun; 

    if (!this.currentAutorunState.running)
      return;

    for (var i = 0; i < this.changedFiles.length; i++) {
        let changedFile = {file: this.changedFiles[i].file, code: this.changedFiles[i].code}
        this.state.updateCode(changedFile);
    }
    
  }
}
