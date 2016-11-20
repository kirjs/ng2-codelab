import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Action} from "../action";


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent {
  @Output() public onCodeChange: EventEmitter<Action> = new EventEmitter<Action>();
  @Input() public files: Array<any>;
}
