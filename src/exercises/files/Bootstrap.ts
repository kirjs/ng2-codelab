import {Vcs} from "../file-builders/Vcs";
import {TsBuilder} from "../file-builders/TsBuilder";
import {TsPlainCode} from "../file-builders/ts/TsPlainCode";
import {AppModule} from "./AppModule";

export const Bootstrap = new Vcs(new TsBuilder('Bootstrap').configure({bootstrap: true, excludeFromTesting: true}))
  .commit('initial', (builder: TsBuilder) => {
    builder.add(new TsPlainCode(
      `import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ResourceLoader} from '@angular/compiler';
import {AppModule} from './AppModule';
`, 'imports'));
  }).commit('solved', (builder: TsBuilder) => {
    builder.add(new TsPlainCode(`
    
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
    `, 'bs'));
  }).commit('withTemplateLoader', (builder: TsBuilder) => {


    (builder.find(TsPlainCode, 'imports') as TsPlainCode).appendContent(`import * as code from './code';`);
    (builder.find(TsPlainCode, 'bs') as TsPlainCode).replaceContent(`
/** 
 * I'm doing some template-loading magic here. 
 * You won't need to do thing for your app, but this is a great 
 * example of how extensible angular 2 is. 
 */
class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    const templateId = url.replace(/\\d*\.html/, 'Code');
    let template = code[templateId];
    if (!template) {
      debugger;
    }
    return Promise.resolve(template);
  };
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: ResourceLoader, useClass: MyResourceLoader}
  ]
});
`);


  }).build();
