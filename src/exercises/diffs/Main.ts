import {Meetup} from './Meetup';

// Below is for your reference, we never actually run the file.
// but feel free to play with the code.
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
