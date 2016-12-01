import {Vcs} from "../file-builders/Vcs";
import {HtmlBuilder} from "../file-builders/HtmlBuilder";
import {ClHtmlDiv} from "../file-builders/html/ClHtmlDiv";
import {ClHtmlTextNode} from "../file-builders/html/ClHtmlTextNode";

export const AppHtml = new Vcs(new HtmlBuilder('app'))
  .commit('initial', (builder: HtmlBuilder) => {
    builder.append(new ClHtmlDiv());
  }).commit('withSearchBox', (builder: HtmlBuilder) => {
    builder.select(ClHtmlDiv).html(new ClHtmlTextNode(`
  <h1>{{title}}</h1>
  <input type="text" placeholder="video">
  <button>Search!</button>
`));
  }).commit('withNoVideosMessage', (builder: HtmlBuilder) => {
    builder.select(ClHtmlDiv).html(new ClHtmlTextNode(`
  <h1>{{title}}</h1>
  <input  placeholder="video" #searchString type="text">
  <button (click)="search(searchString.value)">Search!</button>

  <div *ngIf="!videos?.length">
    No videos!
  </div>
`));
  }).commit('withAllVideos', (builder: HtmlBuilder) => {
    builder.select(ClHtmlDiv).append(new ClHtmlTextNode(`
   <div *ngFor="let video of videos">
    <h2>{{video.title}}</h2>
    <img [src]="video.src">
  </div>
`, 'allVideos'));
  }).commit('withVideoComponent', (builder: HtmlBuilder) => {
    ((builder.select(ClHtmlDiv) as ClHtmlDiv).find('allVideos') as ClHtmlTextNode)
      .replaceContent(` 
  <my-video *ngFor="let video of videos" [video]="video"></my-video>
`);
  }).build();


