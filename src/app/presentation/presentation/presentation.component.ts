import {Component} from '@angular/core';
import {AppState} from '../../codelab/codelab-config';
import {MilestoneConfig} from '../../codelab/milestone-config';
import {StateService, selectedExercise} from '../../codelab/state.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  config: AppState;
  milestone: MilestoneConfig;
  section: 'milestone';
  codelab: string = '';

  get exercise() {
    return selectedExercise(this.config);
  }

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
}
