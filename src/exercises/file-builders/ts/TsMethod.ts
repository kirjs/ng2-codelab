import {TsFunction} from "./TsFunction";



export class TsMethod extends TsFunction {


  generate(): string {
    const params = this.parameters.map(param => param.generate()).join(',');

    return `${this.name}(${params}){\n    ${this.body.generate()}\n  }`
      + '\n'
  }
}
