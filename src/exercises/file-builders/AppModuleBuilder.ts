import {TsGenerator} from "./TsGenerator";
import {JsFileConfig} from "../../app/js-file-config";
import {TsBuilder} from "./TsBuilder";

export class AppModuleBuilder extends TsBuilder implements JsFileConfig {
  public filename;
  ngImports = [];
  ngDeclarations = [];
  ngBootstrap = [];
  ngProviders = [];
  public exports;


  get code() {
    return `import {NgModule} from '@angular/core';
      import {BrowserModule} from '@angular/platform-browser';
      
      @NgModule({
        imports: ${TsGenerator.generateModuleNames(this.ngImports)},
        declarations: ${TsGenerator.generateModuleNames(this.ngDeclarations)},
        providers: ${TsGenerator.generateModuleNames(this.ngProviders)},
        bootstrap: ${TsGenerator.generateModuleNames(this.ngBootstrap)}
      })
      export class AppModule {
      }
      `;
  }

  constructor(moduleName: string) {
    super(moduleName);
  }

  copy() {
    return Object.assign({}, this, {code: this.code});

  }

  public addNgImport(file: JsFileConfig) {
    this.addImport(file);
    this.ngImports.push(file.moduleName);
    return this;
  }
}
