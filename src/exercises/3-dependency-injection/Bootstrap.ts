import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ResourceLoader} from '@angular/compiler';
import {appCode} from './code';
import {AppModule} from "./AppModule";


class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    return Promise.resolve(appCode);
  };
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: ResourceLoader, useClass: MyResourceLoader}
  ]
});
