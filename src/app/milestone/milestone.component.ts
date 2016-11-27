import {Component, OnInit, Input} from '@angular/core';
import {MilestoneConfig} from "../milestone-config";
import {ExerciseConfig} from "../exercise-config";
import {Observable} from "rxjs/Rx";
import {Http} from "@angular/http";
import {StateService, exerciseComplete} from "../state.service";


@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent {
  @Input() config: MilestoneConfig;
  @Input() name: string;

  exerciseComplete(exercise: ExerciseConfig) {
    // TODO: Use pipe
    return exerciseComplete(exercise);
  }

  constructor(public state: StateService) {
  }
}
