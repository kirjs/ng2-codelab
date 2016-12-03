import {Component, Input} from "@angular/core";
import {TestInfo} from "../test-info";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  @Input() tests: Array<TestInfo>;
}
