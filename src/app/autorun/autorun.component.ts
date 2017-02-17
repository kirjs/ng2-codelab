import {Component} from '@angular/core';
import {StateService} from '../state.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-autorun',
  templateUrl: './autorun.component.html',
  styleUrls: ['./autorun.component.css']
})
export class AutorunComponent {
  autorun: boolean;
  private stateSubscription: Subscription;
  private running: boolean;

  constructor(private state: StateService) {

  }

  ngOnInit() {
    this.stateSubscription = this.state.update
      .map(d => d.local.autorun)
      .distinctUntilChanged().subscribe(autorun => {
          this.autorun = autorun;
        }
      );

    this.stateSubscription = this.state.update
      .map(d => d.local.running)
      .distinctUntilChanged().subscribe(running => {
          this.running = running;
        }
      );


  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }


  endRun() {
    this.state.endTests();
  }

  toggleAutorun() {
    this.state.toggleAutorun();
  }

  run() {
    if (!this.running) {
      this.state.run();
    }
  }
}
