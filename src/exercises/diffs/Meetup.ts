import {Guest} from './Guest';
/*d:initial:initial*/// Add your code here
/*/d*//*d:meetupSolved*/
export class Meetup {
  constructor(public guests: Guest[]) {
  }

  getRsvp() {
    return this.guests.filter(guest => guest.rsvp);
  }
}
/*/d*/
