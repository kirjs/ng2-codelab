import {FileConfig} from "../../app/file-config";
import {FileBuilder} from "./FileBuilder";
import {ClHtmlDiv} from "./html/ClHtmlDiv";
import {ClHtmlElement} from "./html/ClHtmlElement";

// This is an ugly wrapper, should be cleaned up
export class HtmlBuilder extends FileBuilder {
  public filename;

  html = new ClHtmlDiv();


  public generate(): FileConfig {
    return Object.assign({
      filename: this.filename + '.html',
      moduleName: this.filename,
      type: 'html',
      code: this.html.generateChildren()
    })
  }

  constructor(moduleName: string) {
    super(moduleName);
  }

  append(element: ClHtmlElement) {
    this.html.append(element);
  }

  insert(element: ClHtmlElement) {
    this.html.html(element);
  }

  select(elementType) {
    return this.html.select(elementType);
  }
}
