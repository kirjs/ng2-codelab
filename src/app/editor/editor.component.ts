import {Component, forwardRef, ViewChild, ElementRef, Input, EventEmitter, Output, AfterViewInit} from "@angular/core";
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


  static calcHeight(lines) {
    return lines * 18;
  }


  constructor(private monacoConfigService: MonacoConfigService) {
    this.editSub = new Subject<String>();
    this.editSub.debounceTime(1000).subscribe((value) => {
      this.onCodeChange.emit(value);
    });
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
          lineNumbersMinChars: 3,
          automaticLayout: true,
        });

      this._editor.getModel().onDidChangeContent(() => {
        this.updateValue(this._editor.getModel().getValue());
      });


      this.updateHeight(this.file.code);
    })
  }

  updateHeight(value: string) {
    const height = EditorComponent.calcHeight(value.split('\n').length);

    if (this.height != height) {
      this.height = height;
      this.editorContent.nativeElement.style.height = height + 'px';
      this._editor.layout();
    }
  }

  updateValue(value: string) {
    this.updateHeight(value);
    this.editSub.next(value)
  }
}

