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

export const Main = new Vcs(new TsBuilder('Main'))
  .commit('initial', (builder: TsBuilder) => {
// At this point I'm done using pseudo AST and just stick to simple stuff.
    builder.add(new TsPlainCode(
      // This gets the content of the other file.
      `import {Meetup} from './Meetup';     
    
// Below is for your reference, but feel free to play with the code.    
const guests = [{
    rsvp: true,
    name: 'Sir Isaac Newton'
  },  
  {
    rsvp: true,
    name: 'Marie Curie'
  },
  {
    rsvp: true,
    name: 'Albert Einstein'
  },
  {
    rsvp: false,
    name: 'Charles Darwin'
  }];
  
  const meetup = new Meetup(guests);
  console.log(meetup.getRsvp());


`));
  })
  .build();
