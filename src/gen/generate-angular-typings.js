const glob = require('glob');
const fs = require('fs');
const files = glob.sync('node_modules/@angular/**/*.d.ts');

const result = files.reduce(function (result, file){
  result[file.replace('node_modules/', '')] = fs.readFileSync(file, 'UTF-8');
  return result;
}, {});

fs.writeFileSync('src/assets/typedefs.json', JSON.stringify(result));

