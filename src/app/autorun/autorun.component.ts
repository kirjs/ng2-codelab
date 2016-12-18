import {Component} from "@angular/core";
import {StateService} from "../state.service";

@Component({
  selector: 'app-autorun',
  templateUrl: './autorun.component.html',
  styleUrls: ['./autorun.component.css']
})
export class AutorunComponent {
  autorun: boolean;

  constructor(private state: StateService) {
    state.update.subscribe((config) => {
      this.autorun = config.local.autorun;
    });
  }

  toggleAutorun() {
    this.state.toggleAutorun();
  }

  run() {
    this.state.run();
  }
}
