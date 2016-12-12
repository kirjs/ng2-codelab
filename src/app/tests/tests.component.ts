import {Component, Input} from "@angular/core";
import {TestInfo} from "../test-info";
import {StateService} from "../state.service";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  private chinaMode;

  constructor(public state: StateService) {
    this.chinaMode = state.appConfig.chinaMode;
  }

  @Input() tests: Array<TestInfo>;
}
