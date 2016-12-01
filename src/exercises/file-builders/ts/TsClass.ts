import {TsStatement} from "./TsStatement";
import {TsVarDec} from "./TsVarDec";
import {TsExpression} from "./TsExpression";
import {TsMethod} from "./TsMethod";


export class TsClass implements TsStatement {

  props: Array<{name: TsVarDec, value: TsStatement, type?: string}> = [];
  methods: TsMethod[] = [];
  constr: TsMethod;

  generate(): string {
    // Export all the way.
    return `export class ${this.name} {${this.generateConstructor()}${this.generateProps()}${this.generateMethods()}}`;
  }

  public filename;
  public exports;


  public generateConstructor() {
    if (!this.constr) return '';
    return '\n  ' + this.constr.generate();
  }

  public setConstructor(constr: TsMethod) {
    this.constr = constr;
  }


  get code() {
    return `debugger`;
  }


  addProp(name: TsVarDec, value: TsExpression, type?) {
    this.props.push({name, value, type})
    return this;
  }

  addMethod(method: TsMethod) {
    this.methods.push(method);
    return this;
  }

  findMethod(search) {
    return this.methods.find(method => method.name === search);
  }

  generateProps() {
    if (!this.props.length) {
      return '';
    }

    return '\n' + this.props.map(prop =>
        `  ${prop.name.generate()} = ${prop.value.generate()}`).join(';\n')
      + ';\n';
  }

  generateMethods() {
    if (!this.methods.length) {
      return '';
    }

    return '\n  ' + this.methods.map(method => method.generate()).join('\n  ')
  }

  constructor(public name: string) {

  }
}
