import {TsStatement} from "./TsStatement";

export interface TsExpression extends TsStatement {
  generate(): string;
}
