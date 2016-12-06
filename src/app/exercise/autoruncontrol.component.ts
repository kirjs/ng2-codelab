//momo new ts file
import {Component, OnInit, OnChanges, SimpleChange, EventEmitter, Input, Output} from '@angular/core';
import {FileConfig} from "../file-config";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import {CodelabConfig} from "../codelab-config";
import { AutorunControlInterface } from "./autoruncontrol.interface"
import {codelabConfig} from "../codelab/codelab-config";

import {Observable, Subject} from "rxjs/Rx";

@Component({
  selector: 'autorun-control',
  templateUrl: './autoruncontrol.component.html',
  styleUrls: ['./autoruncontrol.component.css']
})
export class AutorunControlComponent implements OnInit{

	config: CodelabConfig;
	changeLog: string[] = [];
	labConfig = codelabConfig;
	@Output() onAutorunChange: EventEmitter<AutorunControlInterface> = new EventEmitter<AutorunControlInterface>(); //momo
	autorunEvent: AutorunControlInterface = 
			{autorun:this.labConfig.autorun, running: false}; //momo init autorunner to default;

	constructor(private state: StateService) {
		
		state.update.subscribe((config)=>{
			this.config = config;
		});
	}

	toggleAutorun() {
		this.autorunEvent.autorun = !this.config.autorun;
		//TODO_MOMO:  There probably is a timing issue here while 'running/executing)'
		this.autorunEvent.running = false;  //always reset 'running' to false when toggling autorun
		this.onAutorunChange.emit(this.autorunEvent);
	}

	run() {
			//TODO_MOMO:  Need to disable run button until source execution complete
		this.autorunEvent.running = true;
		this.onAutorunChange.emit(this.autorunEvent);
	}

	ngOnInit(): void {
		this.onAutorunChange.emit(this.autorunEvent); //momo tell exercise initial autorun state as reflected in codelab-config
	}
}
