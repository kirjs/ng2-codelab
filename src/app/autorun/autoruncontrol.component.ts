import {Component} from "@angular/core";
import {StateService} from "../state.service";

@Component({
  selector: 'autorun-control',
  templateUrl: 'autoruncontrol.component.html',
  styleUrls: ['autoruncontrol.component.css']
})
export class AutorunControlComponent {
  autorun: boolean;

  constructor(private state: StateService) {
    state.update.subscribe((config) => {
      this.autorun = config.autorun;
    });
  }

  toggleAutorun() {
    this.state.toggleAutorun();
  }

  run() {
    this.state.run();
  }
}
