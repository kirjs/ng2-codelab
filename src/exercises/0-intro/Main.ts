import {Dog} from './solution/Dog';
import {BarkTranslatingService} from "./BarkingBroadcastingService";

// This
const dog = new Dog(new BarkTranslatingService());
document.body.innerHTML = dog.bark('Wufwuf');
