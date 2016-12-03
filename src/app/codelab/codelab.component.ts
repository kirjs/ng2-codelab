import {Component, OnInit} from "@angular/core";
import {MilestoneConfig} from "../milestone-config";
import {CodelabConfig} from "../codelab-config";
import {StateService} from "../state.service";

@Component({
  selector: 'app-codelab',
  templateUrl: './codelab.component.html',
  styleUrls: ['./codelab.component.css']
})
export class CodelabComponent implements OnInit {
  config: CodelabConfig;
  public collapsePanel = true;
  milestone: MilestoneConfig;
  section: 'milestone';
  feedbackList = [];

  constructor(public state: StateService) {
    state.update.subscribe((config) => {
      this.config = config;
    });
  }

  ngOnInit() {
    this.milestone = this.config.milestones[0];
  }
}
