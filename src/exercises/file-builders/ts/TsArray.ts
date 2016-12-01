import {TsStatement} from "./TsStatement";
import {TsExpression} from "./TsExpression";
export class TsArray implements TsExpression {
  list = [];

  name = 'array';
  generate(): string {
    return JSON.stringify(this.list);
  }

  constructor() {

  }
}
