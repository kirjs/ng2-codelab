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

export const ContextComponent = new Vcs(new TsBuilder('ContextComponent'))
  .commit('initial', (builder: TsBuilder) => {

// At this point I'm done using pseudo AST and just stick to simple stuff.
    builder.add(new TsPlainCode(`import {Component} from '@angular/core';
import {ContextService} from "./ContextService";
import {VideoComponent} from "./VideoComponent";

@Component({
  selector: 'my-ad',
  templa`+`teUrl: 'context.html'
})
export class ContextComponent {
  text: string;
`));
    builder.add(new TsPlainCode('', 'solution'));
    builder.add(new TsPlainCode(`\n}`));

  }).commit('solved', (builder: TsBuilder) => {
    (builder.find(TsPlainCode, 'solution') as TsPlainCode).replaceContent(`  
  constructor(
    public parent: VideoComponent,
    private  service: ContextService
  ) {}

  ngOnInit() {
    this.text = this.service
      .getAdText(this.parent.video.description);
  }`);
  })
  .build();
