const Polyglot = require('node-polyglot');
import {environment} from '../environments/environment';
let zh = {};
const polyglot = new Polyglot();
if (environment.language === 'zh') {
  zh = require("!json-loader!../../exercises/ng2ts/i18n/zh.json");
  polyglot.extend(zh);
} else {
    polyglot.extend(require("!json-loader!../../exercises/ng2ts/i18n/en.json"));
}


export {polyglot};
