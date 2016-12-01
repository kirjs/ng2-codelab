import {TsStatement} from "./TsStatement";
export class TsDecorator implements TsStatement {

  generate(): string {
    if (Object.keys(this.props).length === 0) {
      return `@${this.name}()`;
    }

    return `@${this.name}({
  ${this.generateProps()}     
})`;
  }


  public filename;
  public exports;

  props = {};

  public setValue(prop, value) {
    this.props[prop] = value;
  }

  public pushValue(prop, value) {
    if (!this.props[prop]) {
      this.props[prop] = []
    }

    this.props[prop].push(value);
  }

  constructor(public name: string) {

  }

  private generateProps() {
    return Object.keys(this.props).map((key) => {
      if (Array.isArray(this.props[key])) {
        return `${key}: [${this.props[key].join(',')}]`
      }
      return `${key}: ${JSON.stringify(this.props[key])}`

    }).join(',\n  ');
  }

  removeValue(key: string, value?: string) {
    if (!value) {
      delete this.props[key];
      return;
    }
    this.props[key] = this.props[key].filter(prop => prop !== value);
  }
}
