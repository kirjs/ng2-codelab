import {TsStatement} from "./TsStatement";
export enum TsAcssesModifier {
  PUBLIC,
  PRIVATE,
  PROTECTED
}
const accessModifierMap = {
  [TsAcssesModifier.PUBLIC]: 'public',
  [TsAcssesModifier.PRIVATE]: 'private',
  [TsAcssesModifier.PROTECTED]: 'protected'
};

export class TsVarDec implements TsStatement {
  list = [];


  generate(): string {
    return (this.decorator ? this.decorator + ' ' : '') +
      (this.accessModifier ? accessModifierMap[this.accessModifier] + ' ' : '') +
      this.name + (this.type ? ': ' + this.type : '');
  }

  constructor(public name: string, private type?: string, private accessModifier?: TsAcssesModifier, public decorator?: string) {

  }
}
