/* SVGTurtle
*/
class SVGTurtle {

	name;
	turtle;
	history = [];
	precision = {};

	constructor(
			name,
			space = new PlanarSpace('page'),
			//position = space.newPoint('SVGTurtle position'),
			//heading = new space.Angle(),
			reportPrecision = 6,
		) {

		this.name = `SVGTurtle-${name}`;
		this.turtle = new Turtle(name, space);
		//this.#position = position;
		//this.#heading = heading;

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
	get heading()   { return this.turtle.heading; }
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
		const result = `<rect x="${this.x - width/2}" y="${this.svgY - height/2}" width="${width}" height="${height}" transform="rotate(${this.heading.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	ellipse(width, height) {
		const rx = width / 2;
		const ry = height / 2;
		const result = `<ellipse cx="${this.x}" cy="${this.svgY}" rx="${rx}" ry="${ry}" transform="rotate(${this.heading.degrees},${this.x},${this.svgY})"/>`;
		return result;
	}

	text(text) {
		const result = `<text x="${this.x}" y="${this.svgY}" transform="rotate(${this.heading.degrees},${this.x},${this.svgY})">${text}</text>`;
		return result;
	}

	marker() {
		const result = `
			<use href="#def-marker" class="marker" x="${this.x}" y="${this.svgY}" transform="rotate(${this.heading.degrees},${this.x},${this.svgY})">
				<title>${this.report}</title>
			</use>
		`;
		return result;
	}


	get report() {
		const originAngle = this.turtle.position.angle;

		//console.debug('coordinates:...', this.turtle.coordinates);

		// title text preserves whitespace, so:
		const result = [
			`cartesian:`,
			`	x: ${this.x.toPrecision(this.precision.report)}`,
			`	y: ${this.y.toPrecision(this.precision.report)}`,
			`heading:`,
			`	${this.heading.degrees.toPrecision(this.precision.report)}°`,
			`	${this.heading.radians.toPrecision(this.precision.report)} rad`,
			`	${this.heading.radiansPi.toPrecision(this.precision.report)} π rad`,
			`	${this.heading.radiansTau.toPrecision(this.precision.report)} τ rad`,
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
			//`	${this.history.map((item) => { return `heading:${item.heading.degrees}; x:${item.x}; y:${item.y};`;}).join('\n	')}`,
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


		switch(command.name) {
			// these are presentation only
			case 'circle'       : result = this.circle(...command.argument); break;
			case 'rect'         : result = this.rect(...command.argument); break;
			case 'ellipse'      : result = this.ellipse(...command.argument); break;
			case 'text'         : result = this.text(...command.argument); break;
			case 'marker'       : result = this.marker(); break;

			case 'move'         :
			case 'l'            :
			case 'left'         :
			case 'r'            :
			case 'right'        : result =  SVGTurtle.getLine(this.previousCoordinates, this.currentCoordinates); break;

			case 'jump'         :
			case 'origin'       :
			case 'o'            : break;

			default             : console.warn(`Unknown command: ${command}`); result = `<!-- Unknown command: ${command} -->`; break;

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
		let result = `SVGTurtle| x:${this.x.toPrecision(this.precision.report)}; y:${this.y.toPrecision(this.precision.report)}; heading:${this.heading.degrees};`;
		return result;
	}


	/* A shallow copy of a point suitable for sticking into the history array
	*/
	getHistoryItem(turtleCoordinates) {

		const result = {
			x : turtleCoordinates.position.x,
			y : turtleCoordinates.position.y,
			heading : new this.turtle.space.Angle(turtleCoordinates.heading.degrees),
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



