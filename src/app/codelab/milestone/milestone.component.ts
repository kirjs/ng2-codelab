import {Component, Input} from "@angular/core";
import {MilestoneConfig} from "../milestone-config";
import {StateService} from "../state.service";


@Component({
  selector: 'app-milestone',
  templateUrl: 'milestone.component.html',
  styleUrls: ['milestone.component.css']
})
export class MilestoneComponent {
  @Input() config: MilestoneConfig;
  @Input() name: string;

  constructor(public state: StateService) {
  }
}
