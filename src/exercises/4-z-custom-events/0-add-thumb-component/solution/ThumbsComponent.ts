import {Component, Output, EventEmitter} from '@angular/core';

/**
 * Yes, TypeScript has enums!
 * There's no nice way to use them in the template though.
 */
export enum Thumbs {
  UP,
  DOWN
}

@Component(
  {
    selector: 'my-thumbs',
    templateUrl: 'thumbs.html'
  }
)
export class ThumbsComponent {
  @Output() onThumbs: EventEmitter<Thumbs> = new EventEmitter<Thumbs>();

  thumbsUp() {
    this.onThumbs.emit(Thumbs.UP)
  }

  thumbsDown() {
    this.onThumbs.emit(Thumbs.DOWN)
  }

}
