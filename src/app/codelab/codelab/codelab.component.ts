import {Component, OnInit} from '@angular/core';
import {MilestoneConfig} from '../milestone-config';
import {AppState} from '../codelab-config';
import {StateService} from '../state.service';
import {ActivatedRoute} from '@angular/router';

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
  codelab: string = '';

  constructor(public state: StateService, private route: ActivatedRoute) {
    state.update.subscribe((config) => {
      this.config = config;
    });
    route.params.map(params => params['codelab'])
      .distinctUntilChanged()
      .subscribe((codelab) => {
        state.selectCodelab(codelab);
        this.codelab = codelab;
      });

    route.params.map(params => params['milestone'])
      .distinctUntilChanged()
      .subscribe((milestone = 0) => {
        state.selectMilestone(+milestone);
      });

    route.params.map(params => params['exercise'])
      .distinctUntilChanged()
      .subscribe((exercise = 0) => {
        state.selectExercise(+exercise);
      })


  }

  ngOnInit() {

  }
}
