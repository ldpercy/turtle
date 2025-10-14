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

	constructor(rect) {
		this.rectangle = this.rectangle;
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
		const result = `
			<line class="axis" x1="-100%" y1="0" x2="100%" y2="0"><title>x axis</title></line>
			<line class="axis" x1="0" y1="-100%" x2="0" y2="100%"><title>y axis</title></line>
			<circle class="origin"><title>origin</title></circle>
		`;
		return result;
	}


	get minorGridlines() {
		const result = `
			<pattern id="pattern-gridMinor" width="100" height="100" patternUnits="userSpaceOnUse">
				<polyline points="0,100 100,100 100,0"/>
			</pattern>
			<rect class="viewBox grid-minor"/>
		`;
		return result;
	}/* minorGridlines */

	get majorGridlines() {
		const result = `
			<pattern id="pattern-gridMajor" width="500" height="500" patternUnits="userSpaceOnUse">
				<polyline points="0,500 500,500 500,0"/>
			</pattern>
			<rect class="viewBox grid-major"/>
		`;
		return result;
	}/* majorGridlines */

	toString() {
		const result= `
			${this.minorGridlines}
			${this.majorGridlines}
			${this.axes}
			${this.labels}
		`;

		return result;
	}/* toString */

}/* SVG.CartesianGrid */


