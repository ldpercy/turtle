/* SVGTurtle
*/


import { Turtle } from "./Turtle.js";
import * as Maths from "./Maths.js";


export class SVGTurtle {

	name;
	turtle;
	history = [];
	precision = {};

	constructor(
			name,
			space = new PlanarSpace('page'),
			reportPrecision = 6,
		) {

		this.name = name;
		this.turtle = new Turtle(name, space);
		this.precision.report = reportPrecision;
		this.history.length = 5;
		this.history.push(this.getHistoryItem(this.turtle.coordinates));
		this.history.shift();
	}

	//
	// Accessors
	//

	get x()         { return this.turtle.position.x; }
	get y()         { return this.turtle.position.y; }
	get position()  { return this.turtle.position; }
	get direction() { return this.turtle.position.direction; }
	get svgX()      { return +this.x;}
	get svgY()      { return -this.y; }

	get coordinates()			{ return this.turtle.coordinates; }
	get currentCoordinates()	{ return this.history[this.history.length-1]; }
	get previousCoordinates()	{ return this.history[this.history.length-2]; }


	//
	// mutators
	//

	circle(r) {
		const result = `<circle cx="${this.svgX}" cy="${this.svgY}" r="${r}"/>`;
		return result;
	}

	rect(width, height) {
		const result = `<rect x="${this.x - width/2}" y="${this.svgY - height/2}" width="${width}" height="${height}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	ellipse(width, height) {
		const rx = width / 2;
		const ry = height / 2;
		const result = `<ellipse cx="${this.x}" cy="${this.svgY}" rx="${rx}" ry="${ry}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	text(text) {
		const result = `<text x="${this.x}" y="${this.svgY}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})">${text}</text>`;
		return result;
	}

	marker() {
		const result = `
			<use href="#def-marker" class="marker" x="${this.x}" y="${this.svgY}" transform="rotate(${this.direction.degrees},${this.x},${this.svgY})">
				<title>${this.report}</title>
			</use>
		`;
		return result;
	}

	/* pointInfo
	*/
	pointInfo(x, y) {
		const result = {
			cartesian: '',
			polar : '',
		};

		const coords = new this.turtle.space.CartesianCoordinates(x,y);

		const point = this.turtle.space.newPoint('point marker');
		point.cartesian = coords;

		const svgX = x;
		const svgY = -y;

		const cartesianInfo = [
			`x: ${point.x.toPrecision(this.precision.report)}`,
			`y: ${point.y.toPrecision(this.precision.report)}`,
		];

		const polarInfo = [
			`r: ${point.radius.toPrecision(this.precision.report)}`,
			`a: ${point.angle.degrees.toPrecision(this.precision.report)}°`,
			`a: ${point.angle.radians.toPrecision(this.precision.report)} rad`,
			`a: ${point.angle.radiansPi.toPrecision(this.precision.report)} π rad`,
			`a: ${point.angle.radiansTau.toPrecision(this.precision.report)} τ rad`,
		];

		const pointReport = [
			`cartesian:`,
			`	${cartesianInfo.join('\n\t')}`,
			`polar:`,
			`	${polarInfo.join('\n\t')}`,
			`svg:`,
			`	x: ${svgX.toPrecision(this.precision.report)}`,
			`	y: ${svgY.toPrecision(this.precision.report)}`,
		].join('\n');


		result.cartesian = `
			<line x1="${svgX}" y1="0" x2="${svgX}" y2="${svgY}"><title>${cartesianInfo.join('\n')}</title></line>
			<line x1="0" y1="${svgY}" x2="${svgX}" y2="${svgY}"><title>${cartesianInfo.join('\n')}</title></line>
			<use href="#def-point" class="use-point" x="${svgX}" y="${svgY}">
				<title>${pointReport}</title>
			</use>
		`;

		const angle180 = Maths.degrees180(point.angle.degrees);
		const sweepFlag = (angle180 >= 0) ? 1 : 0;

		result.polar = `
			<line x1="0" y1="0" x2="${point.x}" y2="${-point.y}"><title>${polarInfo.join('\n')}</title></line>
			<circle r="${point.radius}">
				<title>r: ${point.radius.toPrecision(this.precision.report)}</title>
			</circle>
			<path d="M 0,${-point.radius} A ${point.radius},${point.radius} 0 0 ${sweepFlag} ${svgX},${svgY}">
				<title>${polarInfo.join('\n')}</title>
			</path>
			<use href="#def-point" class="use-point" x="${svgX}" y="${svgY}">
				<title>${pointReport}</title>
			</use>
		`;

		return result;
	}/* pointInfo */


	moveToXY(x,y) {
		this.turtle.moveToXY(x,y);
	}

	moveToXYwithRotate(x,y) {
		this.turtle.moveToXYwithRotate(x,y);
	}



	get report() {
		const originAngle = this.turtle.location.angle;

		//console.debug('coordinates:...', this.turtle.coordinates);
		//console.debug('this.position:...', this.position);


		// title text preserves whitespace, so:
		const result = [
			`turtle: ${this.name}`,
			`cartesian:`,
			`	x: ${this.x.toPrecision(this.precision.report)}`,
			`	y: ${this.y.toPrecision(this.precision.report)}`,
			`direction:`,
			`	${this.position.direction.degrees.toPrecision(this.precision.report)}°`,
			`	${this.position.direction.radians.toPrecision(this.precision.report)} rad`,
			`	${this.position.direction.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	${this.position.direction.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`polar:`,
			`	r: ${this.coordinates.position.radius.toPrecision(this.precision.report)}`,
			`	a: ${originAngle.degrees.toPrecision(this.precision.report)}°`,
			`	a: ${originAngle.radians.toPrecision(this.precision.report)} rad`,
			`	a: ${originAngle.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	a: ${originAngle.radiansTau.toPrecision(this.precision.report)} τ rad`,
			`svg:`,
			`	x: ${this.svgX.toPrecision(this.precision.report)}`,
			`	y: ${this.svgY.toPrecision(this.precision.report)}`,
			//`history:`,
			//`	${this.history.map((item) => { return `direction:${item.direction.degrees}; x:${item.x}; y:${item.y};`;}).join('\n	')}`,
		].join('\n');
		return result;
	}







	doCommand = function(command) {
		//console.log(`${this.name}.doCommand:`, command);
		let result = '';


		if (this.turtle.commands.includes(command.name)) {
			const commandResult = this.turtle.doCommand(command);
		}
		this.history.push(this.getHistoryItem(this.turtle.coordinates));
		this.history.shift();


		if (command.draw) {
			switch(command.name) {
				// presentation only commands
				case 'circle'       : result = this.circle(...command.argument); break;
				case 'rect'         : result = this.rect(...command.argument); break;
				case 'ellipse'      : result = this.ellipse(...command.argument); break;
				case 'text'         : result = this.text(...command.argument); break;
				case 'marker'       : result = this.marker(); break;

				// movement commands
				case 'move'         :
				case 'l'            :
				case 'left'         :
				case 'r'            :
				case 'right'        :
				case 'bear'         :
				case 'xy'           :
				case 'xyr'          :
					result =  SVGTurtle.getLine(this.previousCoordinates, this.currentCoordinates); break;

				default             :
					console.warn(`Unknown command: ${command}`);
					result = `<!-- Unknown command: ${command} -->`;
					break;
			}
		}


		//console.log(instruction);
		return result;
	}


	doCommands(commandArray) {
		let result = '';
		commandArray.forEach(command => {
			result += this.doCommand(command);
		});

		return result;
	}


	toString() {
		//let result = super.toString();
		let result = `SVGTurtle| x:${this.x.toPrecision(this.precision.report)}; y:${this.y.toPrecision(this.precision.report)}; direction:${this.direction.degrees};`;
		return result;
	}


	/* A shallow copy of a point suitable for sticking into the history array
	*/
	getHistoryItem(turtleCoordinates) {
		//console.log(turtleCoordinates);
		const result = {
			x : turtleCoordinates.position.x,
			y : turtleCoordinates.position.y,
			direction : new this.turtle.space.Angle(turtleCoordinates.direction.degrees),
		};

		return result;
	}


	//
	// Static
	//


	static getLine(point1, point2) {
		//console.debug('SVGTurtle.getLine:', arguments);
		const result = `<line x1="${point1.x}" y1="${-point1.y}" x2="${point2.x}" y2="${-point2.y}"/>`;
		return result;
	}





}/* SVGTurtle */



