/* SVG
*/
class SVG {


	static scaleViewBox(scale, viewBox) {

	}


	padViewBox(padding, viewBox = '-1200 -1200 2400 2400') {
		const vb = splitViewBox(viewBox);
		return `${vb.x-padding} ${vb.y-padding} ${vb.width + 2*padding} ${vb.height + 2*padding}`;
	}


}/* SVG */


/* SVG.viewBox
*/
SVG.viewBox = class {

	x;
	y;
	width;
	height;

	constructor(
			x, y, width, height,
		) {
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.height = height;
	}

	fromString(viewBoxString) {
		const vba    = viewBoxString.split(' ');
		this.x      = parseInt(vba[0]);
		this.y      = parseInt(vba[1]);
		this.width  = parseInt(vba[2]);
		this.height = parseInt(vba[3]);
		return this;
	}

	toString() {
		return `${this.x} ${this.y} ${this.width} ${this.height}`;
	}

	toStringScale(scale) {
		return `${this.x * scale} ${this.y * scale} ${this.width * scale} ${this.height * scale}`;
	}

	/*
	-1200 -1200 2400 2400
	-2400 -2400 4800 4800
	*/


}/* SVG.viewBox */
