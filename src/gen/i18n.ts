import * as ts from 'typescript';
export function i18n(filename: string, code: string) {
  if (filename != 'tests/codelabTest.ts') {
    return code;
  }
  const replacements = [];
  const source = ts.createSourceFile(filename, code, ts.ScriptTarget.ES5);

  function extractThings(node) {

    if (node.kind === ts.SyntaxKind.CallExpression
      && node.expression.expression
      && node.expression.expression.text === 'polyglot'
      && node.expression.name.text === 't'
    ) {
      replacements.push({
        end: node.getEnd(),
        start: node.getStart(source),
        text: '`[translated]` + ' + source.text.substring(node.getStart(source) + 11,node.getEnd()-1)
      });
    }

    ts.forEachChild(node, extractThings);
  }

  extractThings(source);

  const replacementsReversed = replacements.reverse();
  for (const { start, end, text } of replacementsReversed) {
    code = code.slice(0, start) + text + code.slice(end)
  }

  code = code.replace(`declare const polyglot: {t: (s)=>any};`, '');

  return code;
}
