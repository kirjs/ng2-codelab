import {Codelab} from "./Codelab";

// Use this file for reference.
const guests = [
  {
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

const codelab = new Codelab(guests);

// Angular2 is so much better than this:
document.body.innerHTML = '<ul>' +
  codelab.getRsvp().map(guest => `<li>${guest.name}</li>`).join('') +
  '</ul>';
