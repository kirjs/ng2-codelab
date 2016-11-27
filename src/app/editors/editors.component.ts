import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Action} from "../action";
import {FileConfig} from "../file-config";
import {StateService} from "../state.service";


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent {
  @Output() public onCodeChange: EventEmitter<Action> = new EventEmitter<Action>();
  @Input() public files: Array<any>;

  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  constructor(private  state: StateService) {
  }

  toggleFile(file: FileConfig) {
    this.state.toggleFile(file);
  }

  get hiddenFiles() {
    return this.files.filter(file => !file.hidden);
  }
}
