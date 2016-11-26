import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from '../../1-module/solution/AppModule';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
