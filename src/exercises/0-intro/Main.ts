import {Meetup} from './solution/Meetup';
import {anglars} from './anglars';


// This
const meetup = new Meetup(anglars);
document.body.innerHTML = meetup.getRsvp().map((anglar) =>
  `<h1>
     ${anglar.name}
  </h1>`).join('');
