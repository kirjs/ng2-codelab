import {Injectable} from "@angular/core";

declare const monaco;

@Injectable()
export class MonacoConfigService {
  public monacoReady;

  constructor() {
    this.monacoReady = new Promise((resolve) => {
      const onGotAmdLoader = () => {
        (<any>window).require.config({paths: {'vs': 'assets/monaco/vs'}});
        (<any>window).require(['vs/editor/editor.main'], () => {
          MonacoConfigService.configureMonaco();
          resolve(monaco);
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
    });

  }

  static configureMonaco() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      experimentalDecorators: true,
      allowNonTsExtensions: true,
      noImplicitAny: true,
    });

    // Some fake angular deps, good for catching silly errors.
    // I'd still prefer to have the full version.
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
           
        declare var x = 1;
           
        declare module '@angular/platform-browser' {
          export class BrowserModule {
           
          }                        
        }                                                        
        `;

    if (!monaco.languages.typescript.typescriptDefaults._extraLibs['./AppComponent.d.ts']) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(core, '@angular/core.d.ts');
      //monaco.languages.typescript.typescriptDefaults.addExtraLib(pba, './AppComponent.d.ts');
      //monaco.languages.typescript.typescriptDefaults.addExtraLib(pba, './MeetupSecretModule.d.ts');
      //monaco.languages.typescript.typescriptDefaults.addExtraLib(msm, 'inmemory://model/MeetupSecretModule.ts');
    }
  }
}
