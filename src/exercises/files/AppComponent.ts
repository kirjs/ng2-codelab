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

export const AppComponent = new Vcs(new TsBuilder('AppComponent'))
  .commit('initial', (builder: TsBuilder) => {
    builder.addImport(imports.angular.core.Component)
  }).commit('solved', (builder: TsBuilder) => {
    // Class
    builder.add(new TsClass(builder.filename));
    const decorator = new TsDecorator('Component');
    decorator.setValue('selector', 'my-app');
    decorator.setValue('template', '<h1>Hello CatTube!</h1>');
    builder.addBefore(decorator, TsClass);
  })
  .commit('withTitle', (builder: TsBuilder) => {
    (builder.find(TsClass) as TsClass).addProp(new TsVarDec('title'), new TsString('CatTube'))
  })
  .commit('withVideos', (builder: TsBuilder) => {
    (builder.find(TsClass) as TsClass).addProp(new TsVarDec('videos'), new TsArray());
    (builder.find(TsClass) as TsClass).addMethod(new TsMethod('search',
      [new TsVarDec('searchString', 'string')],
      new TsPlainCode('')))
  })
  .commit('withFakeVideos', (builder: TsBuilder) => {
    builder.addFirst(new TsConstant('FAKE_VIDEOS', [
      {
        title: "Cute kitten",
        src: "/assets/images/kitten1.jpg"
      },
      {
        title: "Kitten on the tree",
        src: "/assets/images/kitten2.jpg"
      },
      {
        title: "Serouis cat",
        src: "/assets/images/kitten2.jpg"
      },
    ]));
  })
  .commit('withVideosFilter', (builder: TsBuilder) => {
    (builder.find(TsClass) as TsClass).findMethod('search').replaceBody(
      new TsPlainCode(`this.videos = FAKE_VIDEOS.filter(video => video.title.indexOf(searchString) >= 0)`));
  })
  .commit('withNgInit', (builder: TsBuilder) => {
    (builder.find(TsClass) as TsClass).addMethod(new TsMethod('ngOnInit', [], new TsPlainCode(`this.search('');`)))
  })
  .commit('withVideoServiceImported', (builder: TsBuilder) => {
    builder.addImport(VideoService.file);
  })
  .commit('withVideoService', (builder: TsBuilder) => {
    (builder.find(TsClass) as TsClass).findMethod('search').replaceBody(new TsPlainCode(`this.videos = this.videoService.search(searchString);`));
    (builder.find(TsClass) as TsClass).setConstructor(new TsMethod('constructor', [new TsVarDec('videoService', 'VideoService', TsAcssesModifier.PRIVATE)], new TsPlainCode(``)));
  })
  .build();
