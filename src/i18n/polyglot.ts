const Polyglot = require('node-polyglot');
const zh = require("!json!../../exercises/ng2ts/i18n/zh.json");
const polyglot = new Polyglot();
polyglot.extend(zh);
export {polyglot};
