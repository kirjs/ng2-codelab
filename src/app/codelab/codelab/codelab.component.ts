import {Component, OnInit} from '@angular/core';
import {MilestoneConfig} from '../milestone-config';
import {AppState} from '../codelab-config';
import {StateService} from '../state.service';

@Component({
  selector: 'app-codelab',
  templateUrl: 'codelab.component.html',
  styleUrls: ['codelab.component.css']
})
export class CodelabComponent implements OnInit {
  config: AppState;
  public collapsePanel = true;
  milestone: MilestoneConfig;
  section: 'milestone';

  constructor(public state: StateService) {
    state.update.subscribe((config) => {
      this.config = config;
    });
  }

  ngOnInit() {
    this.milestone = this.config.codelab.milestones[0];
  }
}
