import {Vcs} from "../file-builders/Vcs";
import {HtmlBuilder} from "../file-builders/HtmlBuilder";
import {ClHtmlDiv} from "../file-builders/html/ClHtmlDiv";
import {ClHtmlTextNode} from "../file-builders/html/ClHtmlTextNode";

export const VideoHtml = new Vcs(new HtmlBuilder('video'))
  .commit('initial', (builder: HtmlBuilder) => {
    builder.append(new ClHtmlDiv());
    builder.select(ClHtmlDiv).html(new ClHtmlTextNode(`
    <!-- Write your code here -->
`));
  }).commit('withInfo', (builder: HtmlBuilder) => {
    builder.select(ClHtmlDiv)
      .html(new ClHtmlTextNode(''))
      .append(new ClHtmlTextNode('<h2>{{video.title}}</h2>', 'header'))
      .append(new ClHtmlTextNode('<img [src]="video.src">', 'image'))
      .append(new ClHtmlTextNode(
        `<div>Views {{video.views}}</div>
<div>Likes {{video.likes}}</div>
<div>Description {{video.description}}</div>`, 'meta'))
      .append(new ClHtmlTextNode('', 'thumbs'))

  }).commit('withThumbs', (builder: HtmlBuilder) => {
    (builder.select(ClHtmlDiv).find('thumbs') as ClHtmlTextNode)
      .replaceContent(`<my-thumbs (onThumbs)="onThumbs($event)"></my-thumbs>`)
  }).commit('withTogglePanel', (builder: HtmlBuilder) => {
    (builder.select(ClHtmlDiv).find('meta') as ClHtmlTextNode)
      .replaceContent(
        `<my-toggle-panel>
  <div class="description">Description: {{video?.description}}</div>
  <div class="extra">
    <div class="views">Views: {{video?.views}}</div>
    <div class="likes">Likes: {{video?.likes}}</div>
  </div>
</my-toggle-panel>`)
  })
  .build();
