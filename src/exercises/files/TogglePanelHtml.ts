import {Vcs} from "../file-builders/Vcs";
import {HtmlBuilder} from "../file-builders/HtmlBuilder";
import {ClHtmlDiv} from "../file-builders/html/ClHtmlDiv";
import {ClHtmlTextNode} from "../file-builders/html/ClHtmlTextNode";

export const ToggelPanelHtml = new Vcs(new HtmlBuilder('togglePanel'))
  .commit('initial', (builder: HtmlBuilder) => {
    builder.append(new ClHtmlDiv());
    builder.select(ClHtmlDiv).html(new ClHtmlTextNode(`
    <!-- Write your code here -->
`));
  }).commit('solved', (builder: HtmlBuilder) => {
    builder.select(ClHtmlDiv)
      .html(new ClHtmlTextNode(`<div *ngIf="showDescription">
  <ng-content select=".description"></ng-content>
  <button (click)="showDescription=false">Show meta</button>
</div>
<div *ngIf="!showDescription">
  <ng-content select=".extra"></ng-content>
  <button (click)="showDescription=true">Show description</button>
</div>`))

  })
  .build();
