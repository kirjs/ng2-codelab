/*d:initial:initial*/// Add your code here
/*/d*//*d:meetupSolved*/
export class Meetup {
  constructor(public guests) {
  }

  getRsvp() {
    return this.guests.filter(anglar => anglar.rsvp);
  }
}
/*/d*/
