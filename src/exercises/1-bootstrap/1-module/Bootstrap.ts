import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './solution/AppModule';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
