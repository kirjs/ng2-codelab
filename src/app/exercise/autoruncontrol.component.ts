import {Component, OnInit, Input} from '@angular/core';
import {FileConfig} from "../file-config";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import {CodelabConfig} from "../codelab-config";

@Component({
  selector: 'autorun-control',
  templateUrl: './autoruncontrol.component.html',
  styleUrls: ['./autoruncontrol.component.css']
})
export class AutoRunControlComponent {

	config: CodelabConfig;

	constructor(public state: StateService) {
	  state.update.subscribe((config)=>{
	    this.config = config;
	  });
	}
}
