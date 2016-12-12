import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";

@Component({
	selector: 'app-resize',
	templateUrl: './resize.component.html',
	styleUrls: ['./resize.component.css'],
	host: {
		'(mousemove)': 'onMouseMove($event)',
		'(mousedown)': 'onMouseDown($event)',
		'(mouseup)': 'mouseStateReset()',
		'(mouseleave)': 'mouseStateReset()'
	}
})
export class ResizeComponent {
	private initOffsetX;
	private isMouseDown;
	private isExpanded;
	private initWidth;
	@Input('width') width;
	@Output() widthChange = new EventEmitter();

	onMouseMove(e) {
		if (!this.isMouseDown) { return; }

		let width = this.initWidth + e.clientX - this.initOffsetX
		this.widthChange.emit(width);
	}

	onMouseDown(e) {
		this.isMouseDown = true;
		this.initOffsetX = e.clientX;
		this.initWidth = this.width
	}

	mouseStateReset() {
		this.isMouseDown = false;
	}
}
