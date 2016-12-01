import {ClHtmlElement} from "./ClHtmlElement";
export class ClHtmlDiv implements ClHtmlElement {
  name = 'div';
  children: ClHtmlElement[] = [];


  generateChildren() {
    return this.children.map(child => child.generate()).join('\n');
  }

  generate(): string {
    return `<div>${this.generateChildren()}</div>`;
  }

  html(children: ClHtmlElement) {
    this.children = [children];
    return this;
  }

  find(name: string) {
    return this.children.find(child => child.name === name);
  }

  append(child: ClHtmlElement) {
    this.children.push(child);
    return this;
  }

  constructor() {

  }

  select(elementType) {
    return this.children.find(child => child instanceof elementType) as ClHtmlDiv;
  }
}
