import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {assert} from './utils';


@Injectable()
export class ScriptLoaderService {

  scripts = {
    SystemJS: require('!!raw-loader!../assets/runner/node_modules/systemjs/dist/system.src'),
    mocha: require('!!raw-loader!../assets/runner/js/mocha'),
    chai: require('!!raw-loader!../assets/runner/js/chai.min'),
    'test-bootstrap': require('!!raw-loader!../assets/runner/js/test-bootstrap'),
    '@angular/core': require('!!raw-loader!../assets/runner/node_modules/@angular/core/bundles/core.umd'),
    '@angular/common': require('!!raw-loader!../assets/runner/node_modules/@angular/common/bundles/common.umd.js'),
    '@angular/compiler': require('!!raw-loader!../assets/runner/node_modules/@angular/compiler/bundles/compiler.umd.js'),
    '@angular/platform-browser': require('!!raw-loader!../assets/runner/node_modules/@angular/platform-browser/bundles/platform-browser.umd.js'),
    '@angular/platform-browser-dynamic': require('!!raw-loader!../assets/runner/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js'),
    '@angular/core/testing': require('!!raw-loader!../assets/runner/node_modules/@angular/core/bundles/core-testing.umd.js'),
    '@angular/compiler/testing': require('!!raw-loader!../assets/runner/node_modules/@angular/compiler/bundles/compiler-testing.umd.js'),
    '@angular/platform-browser/testing': require('!!raw-loader!../assets/runner/node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js'),
    '@angular/platform-browser-dynamic/testing': require('!!raw-loader!../assets/runner/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js'),

    shim: require('!!raw-loader!../assets/runner/node_modules/core-js/client/shim.min.js'),
    zone: require('!!raw-loader!../assets/runner/node_modules/zone.js/dist/zone.js'),
    reflect: require('!!raw-loader!../assets/runner/node_modules/reflect-metadata/Reflect'),
    'system-config': require('!!raw-loader!../assets/runner/js/system-config'),
  };

  getScript(url) {
    assert(this.scripts[url]);
    return this.scripts[url];
  }

  constructor(private http: Http) {
  }
}
