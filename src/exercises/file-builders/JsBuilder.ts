import {FileConfig} from "../../app/file-config";
import {TsGenerator} from "./TsGenerator";
import {JsFileConfig} from "../../app/js-file-config";
import {FileBuilder} from "./FileBuilder";

export class JsBuilder extends FileBuilder implements JsFileConfig {
  protected imports = [];
  exports;


  get code() {
    return `debugger`;
  }


  constructor(moduleName: string) {
    super(moduleName);
    this.exports = [moduleName];
  }


  public removeImport(file: JsFileConfig) {
    this.imports = this.imports.filter(imp => imp !== file);
  }

  public addImport(importConfig: JsFileConfig) {
    if (!Array.isArray(importConfig.exports)) {
      debugger
    }
    // Only add once
    if (this.imports.indexOf(importConfig) === -1) {
      this.imports.push(importConfig);
    }
    return this;
  }
}
