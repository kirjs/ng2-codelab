const glob = require('glob');
const fs = require('fs');
const exercisePath = 'src/exercises/';
const files = glob.sync(exercisePath + '**/*', {
  nodir: true
});

const result = files.reduce(function (result, file){
  result[file.replace(exercisePath, '')] = fs.readFileSync(file, 'UTF-8');
  return result;
}, {});

fs.writeFileSync('src/assets/exercises.json', JSON.stringify(result, null, '  '));

