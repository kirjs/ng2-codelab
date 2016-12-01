import {JsFileConfig} from "../../app/js-file-config";
import {JsBuilder} from "./JsBuilder";
import {TsStatement} from "./ts/TsStatement";
import {TsGenerator} from "./TsGenerator";
import {FileConfig} from "../../app/file-config";

export class TsBuilder extends JsBuilder implements JsFileConfig {
  public filename;
  public exports;
  extra: any;

  private statements: TsStatement[] = [];


  public add(statement: TsStatement) {
    this.statements.push(statement);
  }

  public findIndex(existingStatementType, name) {
    let i = 0;
    for (; i < this.statements.length; i++) {
      if (this.statements[i] instanceof existingStatementType && (!name || this.statements[i].name === name)) {
        break;
      }
    }
    if (i === this.statements.length) {
      throw new Error(`Attempted to insert before ${existingStatementType}, but no such type found.`);
    }
    return i;
  }

  public addFirst(statement: TsStatement) {
    this.statements.unshift(statement);
  }

  public find(existingStatementType, name?): TsStatement {
    return this.statements[this.findIndex(existingStatementType, name)];
  }

  public addBefore(statement: TsStatement, existingStatementType, name?) {
    this.statements.splice(this.findIndex(existingStatementType, name), 0, statement);
  }

  public configure(extra) {
    this.extra = extra;
    return this;
  }

  public generate(): FileConfig {

    return Object.assign({
      filename: this.filename + '.ts',
      moduleName: this.filename,
      type: 'ts',
      code: `${this.imports.length ? TsGenerator.generateImports(this.imports) + '\n\n' :
        ''}${this.statements.map(statement => statement.generate()).join('\n')}`
    }, this.extra);
  }

  constructor(moduleName: string) {
    super(moduleName);
  }

}
