import {Component, ElementRef, ViewChild, AfterViewInit, Input, ChangeDetectorRef} from "@angular/core";
import * as ts from "typescript";
import {FileConfig} from "../file-config";
import {StateService} from "../state.service";

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
  hidden?: boolean
}


function createIframe(config: IframeConfig) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts');
  iframe.setAttribute('frameBorder', '0');
  iframe.setAttribute('src', config.url);
  iframe.setAttribute('class', config.id);
  iframe.setAttribute('style', 'width: 500px; height: 100%');
  return iframe;
}

function injectIframe(element: any, config: IframeConfig): Promise<{setHtml: Function, runMultipleFiles: Function}> {
  if (cachedIframes[config.id]) {
    cachedIframes[config.id].remove();
    delete cachedIframes[config.id];
  }

  const iframe = createIframe(config);
  cachedIframes[config.id] = iframe;
  element.appendChild(iframe);
  const runJs = jsInjector(iframe);
  let index = 0;

  return new Promise((resolve, reject) => {
    if (!iframe.contentWindow) {
      return reject('iframe is gone');
    }
    iframe.contentWindow.onload = () => {
      iframe.contentWindow.console.log = function () {
        console.log.apply(console, arguments);
      };

      const setHtml = (html) => {
        iframe.contentDocument.body.innerHTML = html;
      };
      const displayError = (error, info) => {
        const escaped = (document.createElement('a').appendChild(
          document.createTextNode(error)).parentNode as any).innerHTML;
        setHtml(`
            <div style = "border-top: 1px #888 dotted; padding-top: 4px; margin-top: 4px">Check out your browser console to see the full error!</div>
            <pre>${escaped}</pre>`);
      };

      iframe.contentWindow.console.error = function (error, message) {
        // handle angular error 1/3
        displayError(error, 'Angular Error');
        console.error.apply(console, arguments);
      };


      resolve({
        setHtml: setHtml,
        runMultipleFiles: (files: Array<FileConfig>) => {
          index++;


          (iframe.contentWindow as any).System.register('code', [], function (exports) {
            return {
              setters: [],
              execute: function () {
                files.forEach((file) => {
                  if (!file.moduleName) {
                    debugger
                  }

                  exports(file.path.replace(/[\/\.-]/gi, '_'), file.code);
                });
              }
            }
          });

          files.filter(file => file.path.indexOf('index.html') >= 0).map((file => {
            setHtml(file.code)
          }));

          files.filter(file => file.type === 'ts').map((file) => {
            // Update module names
            let code = file.code;

            if (file.before) {
              code = file.before + ';\n' + code;
            }

            if (file.after) {
              code = ';\n' + code + file.after;
            }

            const moduleName = file.moduleName;


            // TODO(kirjs): Add source maps.
            return ts.transpileModule(code, {
              compilerOptions: {
                module: ts.ModuleKind.System,
                target: ts.ScriptTarget.ES5,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                noImplicitAny: true,
                declaration: true,
                // TODO: figure out why this doesn't work
                inlineSourceMap: true,
                inlineSources: true,
                sourceMap: true
              },
              fileName: moduleName,
              moduleName: moduleName,
              reportDiagnostics: true
            });
          }).map((compiled) => {
            runJs(compiled.outputText);
          });


          files.filter((file) => file.bootstrap).map((file) => {
            const moduleName = file.moduleName;
            runJs(`System.import('${moduleName}')`);
          });
        }
      });
    }
  });
}


@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements AfterViewInit {
  @Input() files: any;
  html = `<my-app></my-app>`;
  @ViewChild('runner') element: ElementRef;


  constructor(private changeDetectionRef: ChangeDetectorRef, private state: StateService) {
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
      id: 'preview', 'url': 'assets/runner/index.html'
    }).then((sandbox) => {
      sandbox.setHtml(this.html);
      sandbox.runMultipleFiles(this.files.filter(file => !file.test));
    });

    injectIframe(this.element.nativeElement, {
      id: 'testing', 'url': 'assets/runner/tests.html', restart: true, hidden: false
    })
      .then((sandbox) => {

        const testFiles = this.files
          .filter(file => !file.excludeFromTesting);
        sandbox.runMultipleFiles(testFiles);
      });


  }

  ngAfterViewInit() {
    this.state.update
      .map(e => e.runId)
      .distinctUntilChanged()
      .subscribe(() => {
        this.runCode()
      }, () => {
        debugger
      });
  }

}
