import {ResourceLoader} from '@angular/compiler';

export class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    return Promise.resolve(appCode);
  };
}
