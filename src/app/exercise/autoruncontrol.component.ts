//momo
import {Component, OnInit, OnChanges, SimpleChange, EventEmitter, Input, Output} from '@angular/core';
import {FileConfig} from "../file-config";
import {StateService, exerciseComplete} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import {CodelabConfig} from "../codelab-config";
import { AutorunControlInterface } from "./autoruncontrol.interface"

//momo
import {Observable, Subject} from "rxjs/Rx";

@Component({
  selector: 'autorun-control',
  templateUrl: './autoruncontrol.component.html',
  styleUrls: ['./autoruncontrol.component.css']
})												//momo
export class AutorunControlComponent implements OnChanges{

	config: CodelabConfig;
	changeLog: string[] = []; //momo
	@Output() onAutorunChange: EventEmitter<AutorunControlInterface> = new EventEmitter<AutorunControlInterface>(); //momo
	autorunEvent: AutorunControlInterface = {	//momo
		autorun: null,
		running: null
	};

	constructor(private state: StateService) {
	  state.update.subscribe((config)=>{
	    this.config = config;
	  });
	}

	toggleAutorun() {
		this.autorunEvent.autorun = !this.config.autorun;
		this.onAutorunChange.emit(this.autorunEvent);
	}

	run() {
		this.autorunEvent.running = true;
		this.onAutorunChange.emit(this.autorunEvent);
	}

	//momo
	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

	}	

	//momo
	ngDoCheck() {

	}
}
