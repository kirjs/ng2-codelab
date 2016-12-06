import {Component, forwardRef, ViewChild, ElementRef, Input, EventEmitter, Output, AfterViewInit} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import {FileConfig} from "../file-config";
import {Subject} from "rxjs";

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
  code: string;

  static calcHeight(lines) {
    return lines * 17;
  }


  constructor() {
    this.editSub = new Subject<String>();
    this.editSub.debounceTime(1000).subscribe((value) => {
      this.onCodeChange.emit(value);
    });
  }

  loadCode(code: string) {
    this._editor.getModel().setValue(code);
  }

  ngAfterViewInit() {
    this.code = this.file.code;
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
      allowNonTsExtensions: true,
      noImplicitAny: true,
    });


    const core = `
        declare module '@angular/core' {
          export class EventEmitter<T> {
            emit: function(param: T);
          }       
            
          export interface ComponentConfig {
            selector: string;
            template?: string;
            templateUrl?: string;
          }
          
          export function Component(config: ComponentConfig);
          
          export interface NgModuleConfig {
            imports?: any[];
            declarations?: any[];
            providers?: any[];
            bootstrap?: any[];           
          }
          export function NgModule(config: NgModuleConfig);
          export function Injectable();
          export function Output();
          export function Input();
          
        }  
           
        declare module '@angular/platform-browser' {
          export class BrowserModule {
           
          }                        
        }                                                        
        `;

    const pba = `    
  
    
    namespace ./AppComponent {
    declare module './AppComponent' {
          export class AppComponent {
            public bootstrapModule(module: Dog): Dog
          }          
    }      

    declare module 'AppComponent' {
          export class AppComponent {
            public bootstrapModule(module: Dog): Dog
          }          
    }      
    }


`;

    if (!monaco.languages.typescript.typescriptDefaults._extraLibs['./AppComponent.d.ts']) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(core, '@angular/core.d.ts');
      monaco.languages.typescript.typescriptDefaults.addExtraLib(pba, './AppComponent.d.ts');
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

    const height = Math.max(100, EditorComponent.calcHeight(this.file.code.split('\n').length));
    this._editor.layout({height: height + 20, width: 700});
  }


  updateValue(value: string) {
    this.code = value;
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

