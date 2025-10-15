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



/* SVG.ViewBox
*/
SVG.ViewBox = class {

	rectangle;

	constructor(rectangle) {
		this.rectangle = rectangle;
	}

	fromString(viewBoxString) {
		const vba    = viewBoxString.split(' ');
		this.rectangle.x      = parseInt(vba[0]);
		this.rectangle.y      = parseInt(vba[1]);
		this.rectangle.width  = parseInt(vba[2]);
		this.rectangle.height = parseInt(vba[3]);
		return this;
	}

	toString() {
		return `${this.rectangle.x} ${this.rectangle.y} ${this.rectangle.width} ${this.rectangle.height}`;
	}

	toStringScaled(scale) {
		return `${this.rectangle.x * scale} ${this.rectangle.y * scale} ${this.rectangle.width * scale} ${this.rectangle.height * scale}`;
	}

	toStringPadded(padding) {
		return `${this.rectangle.x - padding} ${this.rectangle.y - padding} ${this.rectangle.width + 2*padding} ${this.rectangle.height + 2*padding}`;
	}


}/* SVG.ViewBox */



/* SVG.CartesianGrid
*/
SVG.CartesianGrid = class {

	rectangle;

	constructor(space, rectangle, spacingMajor=500, spacingMinor=100) {
		this.space = space;
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
		// todo: add axis labels
		const result = `
			<g class="axis">
				<line x1="-60%" y1="0" x2="60%" y2="0"><title>x axis</title></line>
				<line x1="0" y1="-60%" x2="0" y2="60%"><title>y axis</title></line>
				<circle class="origin"><title>origin</title></circle>
			</g>
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
			xLines += `<line x1="${x}" y1="${this.rectangle.y}" x2="${x}" y2="${this.rectangle.yEnd}"/>`;
		}
		for (y; y <= this.rectangle.yEnd; y += spacing){
			yLines += `<line x1="${this.rectangle.x}" y1="${y}" x2="${this.rectangle.xEnd}" y2="${y}"/>`;
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
			${this.getGridlines(this.spacingMinor,'minor')}
			${this.getGridlines(this.spacingMajor,'major')}
			${this.axes}
			${this.labels}
		`;

		return result;
	}/* toString */

}/* SVG.CartesianGrid */



/* SVG.PolarGrid
*/
SVG.PolarGrid = class {

	rectangle;

	constructor(
			space,
			rectangle,
			spacingMajor=500,
			spacingMinor=100,
			angleMajor=45,
			angleMinor=5,
		) {
		this.space = space;
		this.rectangle = rectangle;
		this.spacingMajor = spacingMajor;
		this.spacingMinor = spacingMinor;
		this.angleMajor = angleMajor;
		this.angleMinor = angleMinor;

		this.radius = .6 * Math.max(rectangle.width, rectangle.height);
	}/* constructor */


	toString() {
		const result= `
			${this.getGridlines(this.spacingMinor,'minor', this.angleMinor)}
			${this.getGridlines(this.spacingMajor,'major', this.angleMajor)}
			${this.polarAxis}
			${this.labels || 'no labels yet'}
		`;

		return result;
	}/* toString */


	get polarAxis() {
		// todo: add axis labels
		const result = `
			<g class="axis">
				<line x1="0" y1="0" x2="0" y2="${-this.radius}"><title>polar axis</title></line>
			</g>
		`;
		return result;
	}/* get polarAxis */


	/* getGridlines
	*/
	getGridlines(spacing, className, angle) {
		let result = '';
		let circles = '', radials = '';

		const a = new this.space.Angle(0);
		const p = this.space.newPoint('radial gridline');

		for (let r = 0; r <= this.radius; r += spacing){
			circles += `<circle cx="0" cy="0" r="${r}"/>`;
		}

		for (let d = 0; d <= 360; d += angle){
			a.degrees = d;
			p.polar = new this.space.PolarCoordinates(a, this.radius);
			radials += `<line x1="0" y1="0" x2="${p.x}" y2="${p.y}"/>`;
		}

		result = `
			<g class="${className}">
				<g class="circles">${circles}</g>
				<g class="radials">${radials}</g>
			</g>
		`;

		return result;
	}/* getGridlines */


}/* SVG.PolarGrid */

