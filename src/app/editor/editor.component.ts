import {Component, forwardRef, HostListener, ViewChild, ElementRef, Input, EventEmitter, Output, AfterViewInit} from "@angular/core";

import {NG_VALUE_ACCESSOR} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import {FileConfig} from "../file-config";
import {Subject} from "rxjs";
import {MonacoConfigService} from "../monaco-config.service";

declare const require: any;

const languages = {
  ts: 'typescript',
  html: 'html'
};

@Component({
  selector: 'app-editor',
  template: `<div #editor class="monaco-editor"></div>`,
  styleUrls: ['./editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ],
})
export class EditorComponent implements AfterViewInit {
  private _editor: any;
  @Input() file: FileConfig;
  @ViewChild('editor') editorContent: ElementRef;
  @Output() onCodeChange = new EventEmitter();
  private editSub: Subject<String>;
  height = 0;
  public code = '';

  @Input() editorH;
  @Input() editorW;
  @Input() isLast: boolean;

  private TITLE_HEIGHT = 30;

  constructor(private monacoConfigService: MonacoConfigService) {
    this.editSub = new Subject<String>();
    this.editSub.debounceTime(1000).subscribe((value) => {
      this.onCodeChange.emit(value);
    });
  }

  ngOnChanges(changes) : void {
    this.resetLayout();
  }

  getHeight() {
    // last editor takes remaining space
    if (this.isLast) {
      return this.editorContent.nativeElement.clientHeight
    }
    return this.editorH
  }

  loadCode(code: string) {
    this._editor.getModel().setValue(code);
  }

  ngAfterViewInit() {
    this.monacoConfigService.monacoReady.then(monaco => {
      const myDiv: HTMLDivElement = this.editorContent.nativeElement;

      this._editor = monaco.editor.create(myDiv,
        {
          value: this.file.code,
          language: languages[this.file.type],
          scrollBeyondLastLine: false,
          readOnly: this.file.readonly,
          tabCompletion: true,
          wordBasedSuggestions: true,
          lineNumbersMinChars: 3
        });

      this._editor.getModel().onDidChangeContent(() => {
        this.updateValue(this._editor.getModel().getValue());
      });

      this.resetLayout();
    })
  }

  resetLayout() {
    if (!this._editor) return
    this._editor.layout({height: this.getHeight(), width: this.editorW});
  }

  updateValue(value: string) {
    if(this.code!=value){
      this.code = value;
      this.editSub.next(value);
    }
  }

  ping() {
    // TODO: Find a better way.
    let model = this._editor.getModel();
    model.setValue(model.getValue());
  }

  @HostListener('window:resize', [])
  onResize() {
    this.resetLayout()
  }
}

