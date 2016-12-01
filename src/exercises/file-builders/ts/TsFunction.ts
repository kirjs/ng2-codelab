import {TsStatement} from "./TsStatement";
import {TsExpression} from "./TsExpression";
import {TsVarDec} from "./TsVarDec";
export class TsFunction implements TsExpression {
  generate(): string {
    throw new Error('not implemented');
  }

  replaceBody(body) {
    this.body = body;
    return this;
  }

  constructor(public name: string, public parameters: Array<TsVarDec>, public body: TsExpression) {

  }
}
