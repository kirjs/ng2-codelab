// Interface
import {Anglar} from "../Anglar";

export class Meetup {
  constructor(public anglars: Anglar[]) {
  }

  getRsvp() {
    return this.anglars.filter(anglar => anglar.rsvp);
  }
}

export function evalJs(str){}
