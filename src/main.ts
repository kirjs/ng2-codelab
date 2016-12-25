import "./polyfills.ts";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/";
import {MonacoConfigService} from './app/monaco-config.service';


  platformBrowserDynamic().bootstrapModule(AppModule);




