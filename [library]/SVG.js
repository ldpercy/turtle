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


SVG.Rectangle = class {
	constructor(
			x, y, width, height,
		) {
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.height = height;
	}

	get xEnd() { return this.x + this.width; }
	get yEnd() { return this.y + this.height; }
}/* SVG.Rectangle */



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




SVG.CartesianGrid = class {

	rectangle;

	constructor(rectangle, spacingMajor=500, spacingMinor=100) {
		this.rectangle = rectangle;
		this.spacingMajor = spacingMajor;
		this.spacingMinor = spacingMinor;
	}

	get labels() {
		const result = `
			<text class="label axis-x" x="+1000" y="0" transform="rotate(90,+1000,0)"><title>+1000</title><tspan dx="-4">+1000</tspan></text>
			<text class="label axis-x" x="+2000" y="0" transform="rotate(90,+2000,0)"><title>+2000</title><tspan dx="-4">+2000</tspan></text>
			<text class="label axis-x" x="-1000" y="0" transform="rotate(90,-1000,0)"><title>-1000</title><tspan dx="-4">-1000</tspan></text>
			<text class="label axis-x" x="-2000" y="0" transform="rotate(90,-2000,0)"><title>-2000</title><tspan dx="-4">-2000</tspan></text>
			<text class="label axis-y" x="0" y="+1000"><title>-1000</title><tspan dx="-4">-1000</tspan></text>
			<text class="label axis-y" x="0" y="+2000"><title>-2000</title><tspan dx="-4">-2000</tspan></text>
			<text class="label axis-y" x="0" y="-1000"><title>+1000</title><tspan dx="-4">+1000</tspan></text>
			<text class="label axis-y" x="0" y="-2000"><title>+2000</title><tspan dx="-4">+2000</tspan></text>
		`;
		return result;
	}/* get labels */


	get axes() {

		// todo: add linecap arrows and axis labels

		const result = `
			<line class="axis" x1="-100%" y1="0" x2="100%" y2="0"><title>x axis</title></line>
			<line class="axis" x1="0" y1="-100%" x2="0" y2="100%"><title>y axis</title></line>
			<circle class="origin"><title>origin</title></circle>
		`;
		return result;
	}/* get axes */


	/* getGridlines
	*/
	getGridlines(spacing, className) {
		let result = '';
		let xLines = '', yLines = '';
		let x = this.rectangle.x - (this.rectangle.x % spacing);
		let y = this.rectangle.y - (this.rectangle.y % spacing);

		for (x; x <= this.rectangle.xEnd; x += spacing){
			xLines += `<line x1="${x}" y1="-100%" x2="${x}" y2="+100%"/>`;
		}
		for (y; y <= this.rectangle.yEnd; y += spacing){
			yLines += `<line x1="-100%" y1="${y}" x2="+100%" y2="${y}"/>`;
		}

		result = `
			<g class="${className}">
				<g class="x">${xLines}</g>
				<g class="y">${yLines}</g>
			</g>
		`;

		return result;
	}/* getGridlines */


	toString() {
		const result= `
			${this.getGridlines(this.spacingMinor,'grid-minor')}
			${this.getGridlines(this.spacingMajor,'grid-major')}
			${this.axes}
			${this.labels}
		`;

		return result;
	}/* toString */

}/* SVG.CartesianGrid */


