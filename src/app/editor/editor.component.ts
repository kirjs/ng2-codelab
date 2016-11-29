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
  @Input() language: string = "typescript";
  @Output() onCodeChange = new EventEmitter();
  editSub: Subject<String>;
  height = 0;
  calcHeight(lines){
    return lines * 16;
  }


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

  static configureMonaco() {

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      experimentalDecorators: true,
      allowNonTsExtensions: true
    });


    const core = `
        declare module '@angular/core' {
          export class Dog {
            public bububu(): string;
          }         
        }                
        `;

    const pba = `    
    import {Dog} from '@angular/core'
    
    declare module '@angular/platform-browser-dynamic' {
          export class Platform {
            public bootstrapModule(module: Dog): Dog
          }
          export declare const platformBrowserDynamic: (extraProviders?: any[]) => Platform;
        }      `;

    if (!monaco.languages.typescript.typescriptDefaults._extraLibs['Dog']) {

      monaco.languages.typescript.typescriptDefaults.addExtraLib(core, '@angular/core.d.ts');
      monaco.languages.typescript.typescriptDefaults.addExtraLib(pba, '@angular/platform-browser-dynamic.d.ts');
    }

    // Only need to configure it once
    EditorComponent.configureMonaco = () => {
    };
  }

  // Will be called once monaco library is available
  initMonaco() {
    EditorComponent.configureMonaco();

    const myDiv: HTMLDivElement = this.editorContent.nativeElement;

    this._editor = monaco.editor.create(myDiv,
      {
        value: this.file.code,
        language: languages[this.file.type],
        scrollBeyondLastLine: false,
        readOnly: this.file.readonly
      });

    this._editor.getModel().onDidChangeContent(() => {
      this.updateValue(this._editor.getModel().getValue());
    });
    // TODO(kirjs): Actually use it.
    const height = Math.max(100, this.calcHeight(this.file.code.split('\n').length));
    this._editor.layout({height: 200, width: 700});
  }


  updateValue(value: string) {
    /*
    TODO(resize):
     const height = this.calcHeight(value.split('\n').length );

    if(this.height != height ){
      this.height = height;
      this.editorContent.nativeElement.style.height = height + 'px';
      this.editorContent.nativeElement.parentElement.style.height = height + 'px';
      this.editorContent.nativeElement.parentElement.parentElement.style.height = height + 'px';
      this._editor.layout();
    }
*/
    this.editSub.next(value)
  }
}

