import {Component, Input, ViewChildren, QueryList} from '@angular/core';
import {FileConfig} from '../file-config';
import {StateService} from '../state.service';
import {EditorComponent} from '../editor/editor.component';
import {AppConfigService} from '../../app-config.service';


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent {
  @Input() public files: Array<any>;
  @ViewChildren(EditorComponent) children: QueryList<EditorComponent>;
  private debug: boolean;
  private currentFile;

  get visibleFiles() {
    return this.files.filter(file => !file.hidden);
  }

  constructor(private  state: StateService, appConfig: AppConfigService) {
    this.debug = appConfig.config.debug;
  }

  onCodeChange(change) {
    this.state.updateCode(change);
  }

  ngOnInit() {
    this.currentFile = this.visibleFiles[0]
  }

  getFileName(file) {
    return file.path.replace(/^.*[\\\/]/, '');
  }

  getOpenedFile() {
    return this.currentFile;
  }

  isOpenFile(file) {
    if (!file || !this.currentFile) { return; }
    return file.path == this.currentFile.path;
  }

  showFile(file) {
    this.currentFile = file;
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
