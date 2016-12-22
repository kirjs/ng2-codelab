declare const polyglot: {t: (s)=>any};
import {Codelab} from './Codelab';
import {Guest} from './Guest';

// Use this file for reference.
const guests = [
  {
    coming: true,
    name: polyglot.t(`Sir Isaac Newton`)
  },
  {
    coming: true,
    name: polyglot.t(`Marie Curie`)
  },
  {
    coming: true,
    name: polyglot.t(`Albert Einstein`)
  },
  {
    coming: false,
    name: polyglot.t(`Charles Darwin`)
  }];

const codelab = new Codelab(guests);

// Angular2 is so much better than this:
document.body.innerHTML = '<ul>' +
  codelab.getGuestsComing().map((guest: Guest) => `<li>${guest.name}</li>`).join('') +
  '</ul>';
