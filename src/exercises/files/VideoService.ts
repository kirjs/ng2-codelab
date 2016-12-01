import {Vcs} from "../file-builders/Vcs";
import {TsBuilder} from "../file-builders/TsBuilder";
import {TsClass} from "../file-builders/ts/TsClass";
import {TsDecorator} from "../file-builders/ts/TsDecorator";
import {TsVarDec} from "../file-builders/ts/TsVarDec";
import {TsString} from "../file-builders/ts/TsString";
import {TsArray} from "../file-builders/ts/TsArray";
import {TsMethod} from "../file-builders/ts/TsMethod";
import {TsPlainCode} from "../file-builders/ts/TsPlainCode";
import {TsConstant} from "../file-builders/ts/TsConstant";
import {imports} from "./imports";
import {Api} from "./Api";

export const VideoService = new Vcs(new TsBuilder('VideoService'))
  .commit('initial', (builder: TsBuilder) => {
    builder.addImport(imports.angular.core.Injectable);
    builder.addImport(Api.file);
    builder.add(new TsClass(builder.filename));
    (builder.find(TsClass) as TsClass).addMethod(new TsMethod('search',
      [new TsVarDec('searchString', 'string')],
      new TsPlainCode(`return Api.fetch(searchString)`)))
  }).commit('injectable', (builder: TsBuilder) => {
    const decorator = new TsDecorator('Injectable');
    builder.addBefore(decorator, TsClass);
  })
  .build();
