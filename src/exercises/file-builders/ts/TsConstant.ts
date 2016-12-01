import {TsStatement} from "./TsStatement";

export class TsConstant implements TsStatement {
  generate(): string {
    return `const ${this.name} = ${JSON.stringify(this.value, null, '  ')};\n`;
  }

  public filename;
  public exports;


  get code() {
    return `debugger`;
  }

  constructor(public name: string, private value: any) {

  }
}
