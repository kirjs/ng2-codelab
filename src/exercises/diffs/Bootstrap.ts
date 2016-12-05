import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ResourceLoader} from "@angular/compiler";
import {AppModule} from "./AppModule";
import * as code from "./code";
/*d:templatePageSetup*/
class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    const templateId = url.replace(/\\d*\.html/, 'Code');
    let template = code[templateId];
    if (!template) {
      console.log(template);
      debugger;
    }
    return Promise.resolve(template);
  };
}
/*/d*//*d:bootstrapSolved*/
const platform = platformBrowserDynamic();

/*/d*//*d:bootstrapSolved:bootstrapSolved*/

platform.bootstrapModule(AppModule);
/*/d*//*d:templatePageSetup*/
platform.bootstrapModule(AppModule, {
  providers: [
    {provide: ResourceLoader, useClass: MyResourceLoader}
  ]
});
/*/d*/
