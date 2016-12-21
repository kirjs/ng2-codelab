import {extractMessages} from './i18n';
const fs = require('fs');
const glob = require('glob');

const files = glob.sync('./exercises/ng2ts/**/*.ts');


const messages = files.reduce((result, file) => {
  console.log(file + '\n');
  const code = fs.readFileSync(file, 'UTF-8');
  const messages = extractMessages(file, code);

  return (messages).reduce((result, message) => {
    const text = message.substr(1, message.length - 2);
    result[text] = text;
    return result;
  }, result);
}, {});

fs.writeFileSync('./exercises/ng2ts/i18n/en.json', JSON.stringify(messages, null, '  '));

