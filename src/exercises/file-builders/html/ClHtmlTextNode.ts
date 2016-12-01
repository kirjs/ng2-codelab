import {ClHtmlElement} from "./ClHtmlElement";

export class ClHtmlTextNode implements ClHtmlElement {
  generate(): string {
    return this.content;
  }

  replaceContent(content: string) {
    this.content = content;
  }

  constructor(private content: string, public name: string = 'text') {

  }
}
