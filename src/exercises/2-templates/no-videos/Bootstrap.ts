import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ResourceLoader} from '@angular/compiler';
import {Component} from '@angular/core';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {appCode} from './code';
import {AppComponent} from "./AppComponent";



@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}


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
