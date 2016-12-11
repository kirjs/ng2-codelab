import {Component, Input, ElementRef, ViewChild, ViewChildren, QueryList} from '@angular/core';

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
  @ViewChild('editorContainer') editor: ElementRef;
  private debug: boolean;


  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  private MIN_EDITOR_HEIGHT = 75;
  private isMouseDown:boolean = false;
  private sizeModels = [];
  private initOffsetY;
  private initModelHeight;

  constructor(private  state: StateService) {
    state.update.subscribe((config) => {
      this.debug = config.app.debug;
    });
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

  // GETTERS
  getSizeModel(i) {
    return this.sizeModels[i] = {
      height: this.getHeight(i),
      width: this.getWidth(i)
    }
  }

  getClosestCollapsedFile(i) {
    for( i; i >= 0; i--) {
      if (!this.files[i]['collapsed']) return i
    }
    return
  }

  getHeight(i) {
    if (!this.sizeModels[i]) return this.MIN_EDITOR_HEIGHT
    return this.sizeModels[i].height
  }

  getWidth(i) {
    if (!this.sizeModels[i]) return this.editor.nativeElement.offsetWidth
    return this.sizeModels[i].width
}

  // MOUSE EVENTS
  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseMove($event, i, prev) {
    $event.preventDefault();

    if (!this.isMouseDown) {
      this.initOffsetY = $event.pageY;
      this.initModelHeight = this.getSizeModel(prev).height;
      return
    }

    this.getSizeModel(prev).height = Math.max(this.initModelHeight + $event.pageY - this.initOffsetY, 0);
  }

  mouseStateReset() {
    this.isMouseDown = false;
  }
}
