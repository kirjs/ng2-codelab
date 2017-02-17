import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import {MonacoConfigService} from './app/monaco-config.service';

if (environment.production) {
  enableProdMode();
}

MonacoConfigService.monacoReady.then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});

