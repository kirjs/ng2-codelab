const Polyglot = require('node-polyglot');
const ru =  require("!json!../../exercises/ng2ts/i18n/ru.json");
const polyglot = new Polyglot();

polyglot.extend(ru);

export {polyglot};
