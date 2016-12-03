//momo new ts file
import {Component, OnInit, OnChanges, SimpleChange, EventEmitter, Input, Output} from '@angular/core';
import {FileConfig} from "../file-config";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import {CodelabConfig} from "../codelab-config";
import { AutorunControlInterface } from "./autoruncontrol.interface"
import {codelabConfig} from "../codelab/codelab-config";

//momo
import {Observable, Subject} from "rxjs/Rx";

@Component({
  selector: 'autorun-control',
  templateUrl: './autoruncontrol.component.html',
  styleUrls: ['./autoruncontrol.component.css']
})												//momo
export class AutorunControlComponent implements OnInit{

	config: CodelabConfig;
	changeLog: string[] = []; //momo
	labConfig = codelabConfig;
	@Output() onAutorunChange: EventEmitter<AutorunControlInterface> = new EventEmitter<AutorunControlInterface>(); //momo
	autorunEvent: AutorunControlInterface = 
			{autorun:this.labConfig.autorun, running: false}; //momo init autorunner to default;

	constructor(private state: StateService) {
		
		state.update.subscribe((config)=>{
			this.config = config;
		});
	}

	//moomo
	toggleAutorun() {
		this.autorunEvent.autorun = !this.config.autorun;
		// this.autorunEvent.running = false;  //always reset 'running' to false when toggling autorun
		this.onAutorunChange.emit(this.autorunEvent);
	}

	//momo
	run() {
		this.autorunEvent.running = true;
		this.onAutorunChange.emit(this.autorunEvent);
	}

	//momo
	ngOnInit(): void {
		this.onAutorunChange.emit(this.autorunEvent); //momo tell exercise initial autorun state as reflected in codelab-config
	}
}
