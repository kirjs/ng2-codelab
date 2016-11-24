import {Component, ElementRef, ViewChild, AfterViewInit, Input, ChangeDetectorRef} from '@angular/core';
import {Http} from "@angular/http";
import * as ts from "typescript";
import {FileConfig} from "../file-config";
import {StateService, selectedExercise} from "../state.service";
import {CodelabConfig} from "../codelab-config";
let cachedIframes = {};

function jsInjector(iframe) {
  return function (script) {
    iframe.contentWindow.eval(script);
  }
}

function cssInjector(iframe) {
  return function (css) {
    const s = iframe.contentDocument.createElement("style");
    s.innerHTML = css;
    iframe.contentDocument.getElementsByTagName("head")[0].appendChild(s);
  }
}

interface IframeConfig {
  id: string,
  url: string,
  restart?: boolean,
  runId?: number,
  hidden?: boolean
}

function injectIframe(element: any, config: IframeConfig) {
  if (config.restart && cachedIframes[config.id]) {
    cachedIframes[config.id].then((sandbox) => {
      sandbox.destroy();
    });
    delete cachedIframes[config.id];
  }


  if (!cachedIframes[config.id]) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts');
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('src', config.url);
    iframe.setAttribute('class', config.id);
    iframe.setAttribute('style', 'width: 600px; height: 600px' + (config.hidden ? ';display: none' : ''));
    element.appendChild(iframe);


    const runJs = jsInjector(iframe);

    iframe.contentWindow.console.log = function () {
      console.log.apply(console, arguments);
    };

    const setHtml = (html) => {
      iframe.contentDocument.body.innerHTML = html;
    };
    const displayError = (error, location) => {
      const escaped = (document.createElement('a').appendChild(
        document.createTextNode(error)).parentNode as any).innerHTML;
      setHtml(`<pre>${escaped}</pre>`);
    };

    iframe.contentWindow.console.error = function (error, message) {
      // handle angular error 1/3
      displayError(error, 'Angular Error');
      console.error.apply(console, arguments);
    };


    cachedIframes[config.id] = new Promise((resolve) => {
      iframe.contentWindow.onload = () => {
        let index = 0;

        const sandbox = {
          destroy: () => {
            iframe.remove();
          },
          setHtml: setHtml,
          runMultipleFiles: (files: Array<FileConfig>) => {
            index++;

            (iframe.contentWindow as any).System.register('code', [], function (exports) {
              return {
                setters: [],
                execute: function () {
                  files.forEach((file) => {
                    console.log(file.moduleName + 'Code');
                    exports(file.moduleName + 'Code', file.code);
                  });
                }
              }
            });


            files.filter(file => file.type === 'ts').map((file) => {
              // Update module names
              let code = files.map(file => file.moduleName).reduce((code, moduleName) => {
                code = code.replace(/__SOLUTION__/g, '');
                code = code.replace('./' + moduleName, './' + moduleName + index);
                return code;
              }, file.code);

              if (file.before) {
                code = file.before + ';\n' + code;
              }

              if (file.after) {
                code = ';\n' + code + file.after;
              }

              const moduleName = file.moduleName + index;
              // TODO(kirjs): Add source maps.
              return ts.transpileModule(code, {
                compilerOptions: {
                  module: ts.ModuleKind.System,
                  target: ts.ScriptTarget.ES5,
                  experimentalDecorators: true,
                  // TODO: figure out why this doesn't work
                  // inlineSourceMap: true,
                  // sourceMap: true
                },
                fileName: moduleName,
                moduleName: moduleName,
                reportDiagnostics: true
              });
            }).map((compiled) => {
              runJs(compiled.outputText);
            });


            files.filter((file) => file.bootstrap).map((file) => {
              const moduleName = file.moduleName + index;
              runJs(`System.import('${moduleName}')`);
            });
          }
        };

        resolve(sandbox)
      }
    });
  }


  return cachedIframes[config.id];
}

export interface RunnerConfig {
  html: String
}
@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements AfterViewInit {
  @Input() files: any;
  html = '<my-app></my-app>';
  @ViewChild('runner') element: ElementRef;
  runId = 0;


  constructor(private changeDetectionRef: ChangeDetectorRef, private http: Http, private state: StateService) {
    state.update
      .map(selectedExercise)
      .map(e => e.editedFiles)
      // TODO: Find a better way to deep compare two arrays, or mb even to track file changes change detection
      .map(a => JSON.stringify(a))
      .distinctUntilChanged()
      .subscribe(() => {
        this.runCode()
      }, () => {
        debugger
      });

    window.addEventListener("message", (event) => {
      if (!event.data || !event.data.type) {
        return;
      }

      if (event.data.type === 'testList') {
        state.setTestList(event.data.tests);

      }
      if (event.data.type === 'testResult') {
        state.updateSingleTestResult({
          title: event.data.test.title,
          pass: event.data.pass,
          result: event.data.result
        });
      }
      changeDetectionRef.detectChanges();
    }, false);
  }

  runCode() {

    injectIframe(this.element.nativeElement, {
      id: 'testing', runId: this.runId++, 'url': 'assets/runner/tests.html', restart: true, hidden: false
    })
      .then((sandbox) => {

        const testFiles = this.files
          .filter(file => !file.ui);
        sandbox.runMultipleFiles(testFiles);
      });


    injectIframe(this.element.nativeElement, {
      id: 'preview', 'url': 'assets/runner/index.html'
    }).then((sandbox) => {
      sandbox.setHtml(this.html);
      sandbox.runMultipleFiles(this.files.filter(file => !file.test));
    });
  }

  ngAfterViewInit() {
    this.state.ping();
  }

}
