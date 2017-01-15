import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {assert} from './utils';


@Injectable()
export class ScriptLoaderService {

  scripts = {
    SystemJS: require('!!raw-loader!../assets/runner/node_modules/systemjs/dist/system.src'),
    mocha: require('!!raw-loader!../assets/runner/js/mocha'),
    chai: require('!!raw-loader!../assets/runner/js/chai.min'),
    'test-bootstrap': require('!!raw-loader!../assets/runner/js/test-bootstrap')

  };

  getScript(url) {
    assert(this.scripts[url]);
    return this.scripts[url];
  }

  constructor(private http: Http) {
  }
}
