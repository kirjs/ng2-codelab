import {Component, Input, ViewChildren, QueryList} from '@angular/core';
import {FileConfig} from '../file-config';
import {StateService} from '../state.service';
import {EditorComponent} from '../editor/editor.component';
import {AppConfigService} from '../../app-config.service';


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent {
  @Input() public files: Array<any>;
  @ViewChildren(EditorComponent) children: QueryList<EditorComponent>;
  private debug: boolean;

  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  onCodeChange(change) {
    this.state.updateCode(change);
  }

  constructor(private  state: StateService, appConfig: AppConfigService) {
    this.debug = appConfig.config.debug;
  }

  toggleFile(file: FileConfig) {
    this.state.toggleFile(file);
  }

  loadSolution(file: FileConfig) {
    this.children.forEach(child => {
      if (child.file === file) {
        child.loadCode(file.solution);
      }
    });
    // TODO: Do this the proper way.
    //this.state.loadSolution(file);
  }
}
