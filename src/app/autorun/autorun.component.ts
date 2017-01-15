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

  constructor(private state: StateService) {

  }

  ngOnInit() {
    this.stateSubscription = this.state.update
      .map(d => d.local.autorun)
      .distinctUntilChanged().subscribe(autorun => {
          this.autorun = autorun;
        }
      );
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }


  toggleAutorun() {
    this.state.toggleAutorun();
  }

  run() {
    this.state.run();
  }
}
