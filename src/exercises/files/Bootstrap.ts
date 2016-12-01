import {Vcs} from "../file-builders/Vcs";
import {TsBuilder} from "../file-builders/TsBuilder";
import {TsPlainCode} from "../file-builders/ts/TsPlainCode";
import {AppModule} from "./AppModule";

export const Bootstrap = new Vcs(new TsBuilder('Bootstrap').configure({bootstrap: true, excludeFromTesting: true}))
  .commit('initial', (builder: TsBuilder) => {
    builder.addImport({
      filename: '@angular/platform-browser-dynamic',
      exports: ['platformBrowserDynamic']
    }).addImport(AppModule.file);
  }).commit('solved', (builder: TsBuilder) => {
    builder.add(new TsPlainCode(`
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
    `));
  }).build();
