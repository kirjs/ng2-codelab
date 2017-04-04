import {extractMessages} from './extractMessages';
const fs = require('fs');
const glob = require('glob');

const files = glob.sync('./src/exercises/ng2ts/**/*.ts');


const messages = files.reduce((result, file) => {
  const code = fs.readFileSync(file, 'UTF-8');
  const messages = extractMessages(file, code);

  return (messages).reduce((result, message) => {
    const text = message.substr(1, message.length - 2);
    result[text] = text;
    return result;
  }, result);
}, {});

console.log(Object.keys(messages).length + ' messages extracted');
fs.writeFileSync('./src/exercises/ng2ts/i18n/en.json', JSON.stringify(messages, null, '  '));

