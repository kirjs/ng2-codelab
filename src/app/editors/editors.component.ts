import {Component, Input, ViewChildren, QueryList} from "@angular/core";
import {FileConfig} from "../file-config";
import {StateService} from "../state.service";
import {EditorComponent} from "../editor/editor.component";
import {ResizeComponent} from "../resize/resize.component";


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

    // TODO(kirjs): This is needed to update typings in the editor. There should be a better way.
    this.children.forEach(child => {
        if(change.code!=child.code){
          // TODO: Find a better way
          child.ping();
        }
    });

  }

  constructor(private  state: StateService) {
    state.update.subscribe((config) => {
      this.debug = config.app.debug;
    });
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
