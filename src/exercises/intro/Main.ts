import {Dog} from './__SOLUTION__Dog';
import {BarkTranslatingService} from "./BarkingBroadcastingService";

// This
const dog = new Dog(new BarkTranslatingService());
document.body.innerHTML = dog.bark('Wufwuf');
