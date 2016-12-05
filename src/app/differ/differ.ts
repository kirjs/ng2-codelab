function assertPositive(number, error) {
  if (number < 0) {
    throw new Error(error);
  }
  return number;
}

export function differ(file, commits) {
  return ['initial'].concat(commits).reduce((result, commit, index, commits) => {
    result[commit] = file.replace(/\/\*[\n\s]*d:([a-z]+)(:[a-z]+)?[\n\s]*\*\/[\n\s]*((.|\n)*?)[\n\s]*\/\*\/d\*\//gi,
      function (match, from, to, value) {

        const fromIndex = assertPositive(commits.indexOf(from), `[Differ] Invalid commit: ${from}`);
        const toIndex = to ? assertPositive(commits.indexOf(to.substr(1)), `[Differ] Invalid commit: ${to.substr(1)}`) : commits.length;
        return (index >= fromIndex && index <= toIndex) ? value : '';
      });
    return result;
  }, {});
}
