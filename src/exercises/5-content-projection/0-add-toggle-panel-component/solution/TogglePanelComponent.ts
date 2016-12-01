import {Component, Input} from '@angular/core';

@Component({
  selector: 'my-toggle-panel',
  templateUrl: './togglePanel.html'
})
export class TogglePanelComponent {
  showDescription = true;
}
