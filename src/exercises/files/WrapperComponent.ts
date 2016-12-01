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

export const WrapperComponent = new Vcs(new TsBuilder('WrapperComponent'))
  .commit('initial', (builder: TsBuilder) => {

// At this point I'm done using pseudo AST and just stick to simple stuff.
    builder.add(new TsPlainCode(`import {Component, Input} from '@angular/core';
import {VideoItem} from "../../shared/VideoItem";

@Component({
  selector: 'my-wrapper',
  // Just using template here to avoid extra files.
  template: \`
    <my-toggle-panel>
    <div class="description">Either show me</div>
    <div class="extra">Or show me</div>
    </my-toggle-panel>
    \`
})
export class WrapperComponent {

}
`));
  })
  .build();
