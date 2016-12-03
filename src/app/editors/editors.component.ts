import {Component, Input, ViewChildren, QueryList} from "@angular/core";
import {FileConfig} from "../file-config";
import {StateService} from "../state.service";
import {EditorComponent} from "../editor/editor.component";


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent {
  @Input() public files: Array<any>;
  @ViewChildren(EditorComponent) children: QueryList<EditorComponent>;

  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  onCodeChange(changedFile) {
    this.state.updateCode(changedFile);
  }

  constructor(private  state: StateService) {
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
