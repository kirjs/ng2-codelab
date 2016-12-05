import "./polyfills.ts";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {environment} from "./environments/environment";
import {AppModule} from "./app/";
import {ExerciseService} from "./app/exercise.service";

if (environment.production) {
  enableProdMode();
}


// I'm trying to get exercises synchronously, but:
// 1. Can't figure out how to use webpack json|raw loader, because the config is not exposed.
// 2. Can't store it in a TS file, because generated JSON breaks TS file (sounds like a TS parser bug)
// So I'm doing this for now, and will find a better way once I have time.
declare const fetch;
fetch('assets/exercises.json').then(r => r.json()).then((exercises) => {
  ExerciseService.exercises = exercises;
  platformBrowserDynamic().bootstrapModule(AppModule);
});

