import {Component, Input} from "@angular/core";
import {StateService} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input() public config: ExerciseConfig;

  public get sanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.config.description);
  }

  constructor(public state: StateService, private sanitizer: DomSanitizer) {

  }
}
