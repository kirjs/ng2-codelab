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

export const TogglePanelComponent = new Vcs(new TsBuilder('TogglePanelComponent'))
  .commit('initial', (builder: TsBuilder) => {

// At this point I'm done using pseudo AST and just stick to simple stuff.
    builder.add(new TsPlainCode(`import {Component, Input} from '@angular/core';

@Component({
  selector: 'my-toggle-panel',
  template` + /*Angular is being smart at some point and wrap the value in require*/`Url:  'togglePanel.html'
})
export class TogglePanelComponent {`));
    builder.add(new TsPlainCode('', 'solution'));
    builder.add(new TsPlainCode(`\n}`));
  }).commit('solved', (builder: TsBuilder) => {
    (builder.find(TsPlainCode, 'solution') as TsPlainCode).replaceContent(`  showDescription = true;`);
  })
  .build();
