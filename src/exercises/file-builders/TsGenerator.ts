import {FileConfig} from "../../app/file-config";
import {JsFileConfig} from "../../app/js-file-config";

export const TsGenerator = {
  generateImports(files: JsFileConfig[]){
    return files.map(file => `import {${file.exports.join(',')}} from '${file.code ? './' : ''}${file.filename}';`)
      .join('\n');
  },

  generateModuleNames(files: FileConfig[]){
    const moduleNames = files.map(file => file.moduleName);
    return JSON.stringify(moduleNames);
  }
};
