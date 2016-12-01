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

export const ThumbsComponent = new Vcs(new TsBuilder('ThumbsComponent'))
  .commit('initial', (builder: TsBuilder) => {
    builder.addImport(imports.angular.core.COE);

    builder.add(new TsPlainCode(`/**
 * Yes, TypeScript has enums!
 * There's no nice way to use them in the template though.
 */
export enum Thumbs {
  UP,
  DOWN
}
`));
    builder.add(new TsClass(builder.filename));
  }).commit('solved', (builder: TsBuilder) => {
    const decorator = new TsDecorator('Component');
    decorator.setValue('selector', 'my-thumbs');
    decorator.setValue('templateUrl', './thumbs.html');

    builder.addBefore(decorator, TsClass);

    //@Output() onThumbs: EventEmitter<Thumbs> = new EventEmitter<Thumbs>();

    (builder.find(TsClass) as TsClass).addProp(new TsVarDec('onThumbs', 'EventEmitter<Thumbs>',
      TsAcssesModifier.PUBLIC, '@Output()'), new TsPlainCode(`new EventEmitter<Thumbs>()`))
      .addMethod(new TsMethod('thumbsUp', [], new TsPlainCode(`this.onThumbs.emit(Thumbs.UP)`)))
      .addMethod(new TsMethod('thumbsDown', [], new TsPlainCode(`this.onThumbs.emit(Thumbs.DOWN)`)));
  })
  .build();
