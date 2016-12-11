import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";

@Component({
	selector: 'resize',
	templateUrl: `
		<div [class.overlay]="isExpanded"></div>
			<div
				[class.is-expanded]="isExpanded">
			</div>
		`,
	styles: [`
	div {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 10px;
		border-right: 1px dashed rgba(128, 128, 128, 0.5);
		cursor: col-resize;
	}

	.is-expanded {
		width: 100%;
	}

	.overlay {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
  `],
	host: {
		'(mousemove)': 'onMouseMove($event)',
		'(mousedown)': 'onMouseDown($event)',
		'(mouseup)': 'onMouseUp()',
		'(mouseleave)': 'onMouseUp()'
	}
})
export class ResizeComponent {
	private initOffsetX;
	private isMouseDown;
	private isExpanded;
	private initWidth;
	@Input('width') width;
	@Output() widthChange = new EventEmitter();

	constructor(private elRef: ElementRef) {}

	onMouseMove(e) {
		if (!this.isMouseDown) return
		this.isExpanded = true;

		let w= this.initWidth + e.clientX -this.initOffsetX
		this.widthChange.emit(w);
	}

	onMouseDown(e) {
		this.isMouseDown = true;
		this.initOffsetX = e.clientX;
		this.initWidth = this.width
	}

	onMouseUp() {
		this.isMouseDown = false;
		this.isExpanded = false;
	}
}
