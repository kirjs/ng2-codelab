import {Guest} from './Guest';
/*d:initial:initial*/// Add your code here
/*/d*//*d:codelabSolved*/
export class Codelab {
  constructor(public guests: Guest[]) {
  }

  getRsvp() {
    return this.guests.filter(guest => guest.rsvp);
  }
}
/*/d*//*d:neverShow*/
// Needed for type checking
export function evalJs(param){ return param;}
/*/d*/
