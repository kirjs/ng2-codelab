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

export const ContextService = new Vcs(new TsBuilder('ContextService'))
  .commit('initial', (builder: TsBuilder) => {

// At this point I'm done using pseudo AST and just stick to simple stuff.
    builder.add(new TsPlainCode(`export class ContextService {
  getAdText(description) {
    // Super secret algorithm, please don't share outside of this course.
    return description.indexOf('music') >= 0 ?
      'Buy awesome speakers on our web site.' :
      'Check out our web site';
  }
}
`));
  })
  .build();
