import {Component, OnInit, Input} from '@angular/core';
import {StateService} from '../../codelab/state.service';


@Component({
  selector: 'app-presentation-editor',
  templateUrl: './presentation-editor.component.html',
  styleUrls: ['./presentation-editor.component.css']
})
export class PresentationEditorComponent implements OnInit {
  @Input() public files: Array<any>;
  public file: any;

  constructor(private state: StateService) {
  }

  selectFile(file) {
    this.file = file;
  }

  onCodeChange(change) {
    this.state.updateCode(change);
  }

  ngOnInit() {
    this.file = this.files[0];
  }

}
