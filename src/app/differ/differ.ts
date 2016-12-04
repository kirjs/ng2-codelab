function stripComments(code, included) {
  return code.replace(/\/\*d:([a-z\-]+)\*\/*((.|\n)+?)\/\*\/d\*\//gi, (match, commit, value) => {
    return included.includes(commit) ? value : '';
  });
}

export function differ(file, commits) {
  const included = [];
  return ['initial'].concat(commits).reduce((result, commit) => {
    included.push(commit);
    result[commit] = stripComments(file, included);
    return result;
  }, {});
}
