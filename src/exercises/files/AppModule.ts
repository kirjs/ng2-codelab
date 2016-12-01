import {Vcs} from "../file-builders/Vcs";
import {TsBuilder} from "../file-builders/TsBuilder";
import {imports} from "./imports";
import {TsClass} from "../file-builders/ts/TsClass";
import {TsDecorator} from "../file-builders/ts/TsDecorator";
import {AppComponent} from "./AppComponent";
import {VideoService} from "./VideoService";
import {VideoComponent} from "./VideoComponent";
import {ThumbsComponent} from "./ThumbsComponent";
import {WrapperComponent} from "./WrapperComponent";
import {TogglePanelComponent} from "./TogglePanelComponent";
import {ContextComponent} from "./ContextComponent";

export const AppModule = new Vcs(new TsBuilder('AppModule'))
  .commit('initial', (builder: TsBuilder) => {
    builder.addImport(imports.angular.platformBrowser.BrowserModule)
      .addImport(imports.angular.core.NgModule).addImport(AppComponent.file);

  })
  .commit('base', (builder: TsBuilder) => {
    // Class
    builder.add(new TsClass(builder.filename));

    // Decorator
    const decorator = new TsDecorator('NgModule');
    decorator.pushValue('imports', 'BrowserModule');
    builder.addBefore(decorator, TsClass);
  })
  // Next 2 commits are an ugly hack to get a module with thumbs component only.
  .commit('thumbs', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('declarations', 'ThumbsComponent');
    decorator.pushValue('bootstrap', 'ThumbsComponent');
    builder.addImport(ThumbsComponent.file)
  })
  .commit('thumbsRollback', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.removeValue('declarations', 'ThumbsComponent');
    decorator.removeValue('bootstrap', 'ThumbsComponent');
    builder.removeImport(ThumbsComponent.file);
  })
  .commit('wrapper', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('declarations', 'WrapperComponent');
    decorator.pushValue('declarations', 'TogglePanelComponent');
    decorator.pushValue('bootstrap', 'WrapperComponent');
    builder.addImport(TogglePanelComponent.file);
    builder.addImport(WrapperComponent.file);

  })
  .commit('WrapperRollback', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.removeValue('declarations', 'WrapperComponent');
    decorator.removeValue('declarations', 'TogglePanelComponent');
    decorator.removeValue('bootstrap', 'WrapperComponent');
    builder.removeImport(TogglePanelComponent.file);
    builder.removeImport(WrapperComponent.file);
  })
  .commit('solved', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('declarations', 'AppComponent');
    decorator.pushValue('bootstrap', 'AppComponent');
  })
  .commit('withVideoServiceInjected', (builder: TsBuilder) => {
    builder.addImport(VideoService.file)
  })
  .commit('withVideoService', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('providers', 'VideoService');
  })
  .commit('withVideoComponentInjected', (builder: TsBuilder) => {
    builder.addImport(VideoComponent.file)
  })
  .commit('withVideoComponent', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('declarations', 'VideoComponent');
  })
  .commit('withThumbsInjected', (builder: TsBuilder) => {
    builder.addImport(ThumbsComponent.file)
  })
  .commit('withThumbsComponent', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('declarations', 'ThumbsComponent');
  })
  .commit('withTogglePanelInjected', (builder: TsBuilder) => {
    builder.addImport(TogglePanelComponent.file)
  })
  .commit('withTogglePanel', (builder: TsBuilder) => {
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('declarations', 'TogglePanelComponent');
  })
  .commit('withContextComponent', (builder: TsBuilder) => {
    builder.addImport(ContextComponent.file);
    const decorator = builder.find(TsDecorator) as TsDecorator;
    decorator.pushValue('declarations', 'ContextComponent');
  })
  .build();
