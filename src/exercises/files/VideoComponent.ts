import {Vcs} from "../file-builders/Vcs";
import {TsBuilder} from "../file-builders/TsBuilder";
import {TsClass} from "../file-builders/ts/TsClass";
import {TsDecorator} from "../file-builders/ts/TsDecorator";
import {TsVarDec, TsAcssesModifier} from "../file-builders/ts/TsVarDec";
import {TsString} from "../file-builders/ts/TsString";
import {TsArray} from "../file-builders/ts/TsArray";
import {TsMethod} from "../file-builders/ts/TsMethod";
import {TsPlainCode} from "../file-builders/ts/TsPlainCode";
import {TsConstant} from "../file-builders/ts/TsConstant";
import {imports} from "./imports";
import {VideoService} from "./VideoService";
import {VideoItem} from "./VideoItem";

export const VideoComponent = new Vcs(new TsBuilder('VideoComponent'))
  .commit('initial', (builder: TsBuilder) => {
    builder.addImport(imports.angular.core.ComponentAndInput);
    builder.addImport(VideoItem.file);
    builder.add(new TsClass(builder.filename));
  }).commit('solved', (builder: TsBuilder) => {
    const decorator = new TsDecorator('Component');
    decorator.setValue('selector', 'my-video');
    decorator.setValue('templateUrl', 'video.html');
    builder.addBefore(decorator, TsClass);
  })
  .commit('withInput', (builder: TsBuilder) => {
    (builder.find(TsClass) as TsClass).addProp(new TsVarDec('video', 'VideoItem', TsAcssesModifier.PUBLIC, '@Input()'), new TsString('CatTube'))
  }).commit('withThumbsInjected', (builder: TsBuilder) => {
    builder.addImport({filename: './ThumbsComponent', exports: ['Thumbs']});
  }).commit('withThumbsEventHandled', (builder: TsBuilder) => {
    (builder.find(TsClass) as TsClass).addMethod(new TsMethod('onThumbs', [new TsVarDec('thumbs', 'Thumbs')], new TsPlainCode(
      `if(thumbs == Thumbs.UP){
      this.video.likes++;
    }
    if(thumbs == Thumbs.DOWN){
      this.video.likes--;
    }`)))
  })
  .build();
