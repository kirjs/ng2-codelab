import {TsExpression} from "./TsExpression";
export class TsString implements TsExpression {
  public name = 'string';
  generate(): string {
    return JSON.stringify(this.text);
  }

  constructor(private text: string) {

  }
}
