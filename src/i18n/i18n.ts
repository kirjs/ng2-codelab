import * as ts from 'typescript';
import {polyglot} from './polyglot';
import {extractMessagesFromSourceFile} from './extractMessages';

export function i18n(filename: string, code: string) {
  if (filename.indexOf('.ts') < 0) {
    return code;
  }
  const source = ts.createSourceFile(filename, code, ts.ScriptTarget.ES5);
  const messages = extractMessagesFromSourceFile(source);

  const replacementsReversed = messages.reverse();
  for (const {start, end, text} of replacementsReversed) {
    const qstart = text.slice(0, 1);
    const qend = text.slice(text.length - 1);
    const translated = polyglot.t(text.slice(1, text.length - 1));
    code = code.slice(0, start) + qstart + translated + qend + code.slice(end)
  }
  code = code.replace(`declare const polyglot: {t: (s)=>any};`, '');
  return code;
}
