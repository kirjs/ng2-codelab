import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Action} from "../action";
import {FileConfig} from "../file-config";
import {StateService} from "../state.service";
//momo
import { AutorunControlInterface } from "../exercise/autoruncontrol.interface"


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent {
  @Output() public onCodeChange: EventEmitter<Action> = new EventEmitter<Action>();
  @Output() public onAutorunChange: EventEmitter<AutorunControlInterface> = new EventEmitter<AutorunControlInterface>();
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
