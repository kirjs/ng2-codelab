import {
  Component, ApplicationRef, forwardRef, ViewChild, ElementRef, Input, EventEmitter, Output,
  AfterViewInit, ContentChild, TemplateRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs/Rx";
import 'rxjs/add/operator/debounceTime'
import {FileConfig} from "../file-config";

declare const monaco: any;
declare const require: any;


@Component({
  selector: 'app-editor',
  template: `<div id='editor' #editor class="monaco-editor" 
                style="width:600px;height:150px;border:1px solid grey"></div>`,
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
  @Input() language: string = "typescript";
  @Output() onCodeChange = new EventEmitter();
  editSub: Subject<String>;


  constructor(private http: Http, private applicationRef: ApplicationRef) {
    this.editSub = new Subject<String>();
    this.editSub.debounceTime(1000).subscribe((value) => {
      this.onCodeChange.emit(value);
    });
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    const onGotAmdLoader = () => {
      (<any>window).require.config({paths: {'vs': 'assets/monaco/vs'}});
      (<any>window).require(['vs/editor/editor.main'], () => {
        this.initMonaco();
      });
    };

    // Load AMD loader if necessary
    if (!(<any>window).require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'assets/monaco/vs/loader.js';
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }

  // Will be called once monaco library is available
  initMonaco() {

    const typeSources = [
      'core/src/core',
      'core/src/metadata',
      'core/index'
    ].map(a => 'assets/@angular/' + a + '.d.ts');
    Observable.forkJoin(typeSources.map(a => this.http.get(a)))
      .subscribe((typeDefinitions) => {

        // TODO: Remove filter
        typeDefinitions.filter(() => false).map(t => t.text()).map((definition, index) => {

          if (definition.indexOf('<html') >= 0) {

          }

          const name = typeSources[index] + '.d.ts';
          monaco.languages.typescript.typescriptDefaults.addExtraLib(definition, name);
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          experimentalDecorators: true,
          allowNonTsExtensions: true
        });


        const myDiv: HTMLDivElement = this.editorContent.nativeElement;
        this._editor = monaco.editor.create(myDiv,
          {
            value: this.file.code,
            language: this.language,
            scrollBeyondLastLine: false,
            readOnly: this.file.readonly
          });
        this._editor.getModel().onDidChangeContent((e) => {
          this.updateValue(this._editor.getModel().getValue());
        });
      });

  }

  updateValue(value: string) {
    this.editSub.next(value)
  }
}

