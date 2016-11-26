import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ResourceLoader} from '@angular/compiler';
import * as code from './code';
import {AppModule} from "./AppModule";


class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    let template = code[url.replace('.html', 'Code')];
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
