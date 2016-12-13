import {Component, Input} from "@angular/core";
import {StateService} from "../state.service";
import {ExerciseConfig} from "../exercise-config";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  @Input() public config: ExerciseConfig;
  public presentationMode: boolean;

  public get sanitizedDescription() {
    return this.sanitizer.bypassSecurityTrustHtml(this.config.description);
  }

  constructor(private state: StateService, private sanitizer: DomSanitizer) {
    state.update.subscribe(state => this.presentationMode = state.app.presentationMode);
  }

  onCodeChange(changedFile) {
    this.state.updateCode(changedFile);
  }
}
