import {TsBuilder} from "./TsBuilder";
import {TsClass} from "./ts/TsClass";
import {TsDecorator} from "./ts/TsDecorator";

const appModule = new TsBuilder('AppModule');

appModule.update((builder: TsBuilder) => {
  builder.addImport({filename: '@angular/core', exports: ['Component']});
  builder.add(new TsClass(builder.filename));
  builder.addBefore(new TsDecorator('NgModule'), TsClass);
});


const code = appModule.update((builder: TsBuilder) => {
  (builder.find(TsDecorator) as TsDecorator)
    .pushValue('imports', '"AppComponent"');

});


console.log(code);

