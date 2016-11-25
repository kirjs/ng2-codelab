//
import {BarkTranslatingService} from "./BarkingBroadcastingService";

export class Dog {
  constructor(public translation: BarkTranslatingService) {
  }

  bark(content: string): string {
    return this.translation.translate(content);
  }
}

// TODO: This function get's added at run time, is needed for testing only,
// and sholdn't technically be part of the solution.
// Only need it here for typechecking in the test file.
export function evalJs(str) {
}
