import {Component, Input} from "@angular/core";
import {MilestoneConfig} from "../milestone-config";


@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent {
  @Input() config: MilestoneConfig;
  @Input() name: string;
}
