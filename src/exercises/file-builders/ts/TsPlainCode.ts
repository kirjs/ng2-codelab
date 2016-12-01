import {TsStatement} from "./TsStatement";
export class TsPlainCode implements TsStatement {
  generate(): string {
    return this.code;
  }

  replaceContent(code) {
    this.code = code;
  }
  appendContent(code) {
    this.code += code;
  }

  constructor(public code: string, public name = 'any') {

  }
}
