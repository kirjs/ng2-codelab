import {Component, forwardRef, ViewChild, ElementRef, Input, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {StateService} from '../state.service';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {FileConfig} from '../file-config';
import {Subject} from 'rxjs';
import {MonacoConfigService} from '../../monaco-config.service';
declare const monaco: any;
declare const require: any;


@Component({
  selector: 'app-editor',
  template: `<div #editor class="monaco-editor"></div>`,
  styleUrls: ['editor.component.css'],
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
  @Input() public file: FileConfig;
  @Input() fontSize = 12;
  @ViewChild('editor') editorContent: ElementRef;
  @Output() onCodeChange = new EventEmitter();
  private editSub: Subject<String>;
  height = 0;
  public code = '';

  calcHeight(lines) {
    let lineHeight = this.fontSize + 6;
    return Math.max(lines * lineHeight, lineHeight * 6);
  }


  constructor(private monacoConfigService: MonacoConfigService, public state: StateService) {
    this.editSub = new Subject<String>();
    const autorun = state.update.map(a => a.local.autorun).distinctUntilChanged();

    this.editSub.publish(A => autorun.switchMap(a => a ? A.debounceTime(1000) : A))
      .subscribe(this.onCodeChange);
  }

  loadCode(code: string) {
    this._editor.getModel().setValue(code);
  }

  ngAfterViewInit() {
    const myDiv: HTMLDivElement = this.editorContent.nativeElement;

    this._editor = this.monacoConfigService.monaco.editor.create(myDiv,
      {
        model: this.monacoConfigService.monaco.editor.getModel(this.file.path),
        scrollBeyondLastLine: false,
        readOnly: this.file.readonly,
        tabCompletion: true,
        wordBasedSuggestions: true,
        lineNumbersMinChars: 3,
        automaticLayout: true,
        fontSize: this.fontSize
      });

    this._editor.getModel().onDidChangeContent(() => {
      this.updateValue(this._editor.getModel().getValue());
    });

    //Re-running the code on Ctrl + Enter
    this._editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => this.state.run());

    this.updateHeight(this.file.code);

  }

  updateHeight(value: string) {
    const height = this.calcHeight(value.split('\n').length);

    if (this.height != height) {
      this.height = height;
      this.editorContent.nativeElement.style.height = height + 'px';
      this._editor.layout();
    }
  }

  ngOnDestroy() {
    this.onCodeChange.unsubscribe();
    this.editSub.unsubscribe();
  }

  updateValue(value: string) {
    if (this.code != value) {
      this.code = value;
      this.updateHeight(value);
      this.editSub.next(value);
    }
  }

  ping() {
    // TODO: Find a better way.
    let model = this._editor.getModel();
    const oldFullModelRange = model.getFullModelRange();
    const oldModelValueLength = model.getValueLengthInRange(oldFullModelRange);
    const endLineNumber = model.getLineCount();
    const endColumn = model.getLineMaxColumn(endLineNumber);
    model._emitContentChanged2(1, 1, endLineNumber, endColumn, oldModelValueLength, model.getValue(), false, false);
  }
}

