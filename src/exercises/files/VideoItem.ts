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

export const VideoItem = new Vcs(new TsBuilder('VideoItem'))
  .commit('initial', (builder: TsBuilder) => {
    builder.addFirst(new TsPlainCode(`export interface VideoItem {
  title: string,
  src: string,
  description: string,
  views: number
  likes: number,
  date: string
}
`))
  })
  .build();
