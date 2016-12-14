import {Component, ElementRef} from "@angular/core";

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
	private initWidth;
	private isMouseDown:boolean;
	private width;

	constructor(private elRef: ElementRef) {}

	ngOnInit() {
		this.width = this.elRef.nativeElement.clientWidth;
	}

	onMouseMove(e) {
		e.preventDefault();
		if (!this.isMouseDown) { return; }

		this.width = this.initWidth + e.clientX - this.initOffsetX;
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
