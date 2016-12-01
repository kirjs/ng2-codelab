import {Vcs} from "../file-builders/Vcs";
import {HtmlBuilder} from "../file-builders/HtmlBuilder";
import {ClHtmlDiv} from "../file-builders/html/ClHtmlDiv";
import {ClHtmlTextNode} from "../file-builders/html/ClHtmlTextNode";

export const ThumbsHtml = new Vcs(new HtmlBuilder('thumbs'))
  .commit('initial', (builder: HtmlBuilder) => {
    builder.append(new ClHtmlDiv());
    builder.select(ClHtmlDiv).html(new ClHtmlTextNode(`
    <!-- Write your code here -->
`));
  }).commit('solved', (builder: HtmlBuilder) => {
    builder.select((ClHtmlDiv)).html(new ClHtmlTextNode(
      `<button (click)="thumbsUp()" class="thumbs-up">
  Thumbs up
</button>
<button (click)="thumbsDown()" class="thumbs-down">
  Thumbs down
</button>`))

  }).build();
