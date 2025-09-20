

/* Turtle
*/
class Turtle {

	//#heading = 0; // radians
	#headingPi = 0; // internally heading is stored in units of pi radians

	reportPrecision = 5;

	constructor(x=0, y=0, headingDegrees=0, precision=12) {
		this.x = x;
		this.y = y;
		this.headingDegrees = headingDegrees;
		this.precision = precision;
	}


	//
	// Accessors
	//

	get headingRadians()    { return this.headingPi * Math.PI ; }
	get headingRadiansPi()  { return this.headingPi; }
	get headingRadiansTau() { return this.headingPi / 2; }
	get headingDegrees()    { return this.headingPi * 180; }

	set headingRadians(radians)         { this.headingPi = radians / Math.PI; }
	set headingRadiansPi(radiansPi)     { this.headingPi = radiansPi; }
	set headingRadiansTau(radiansTau)   { this.headingPi = radiansTau * 2; }
	set headingDegrees(degrees)         { this.headingPi = (degrees/180); }


/*
	toPoint = function(point) { 		// draw line from current to new
		const result = `<line x1="${this.x}" y1="${this.y}" x2="${point.x}" y2="${point.y}"/>`;
		this.heading = Turtle.getHeading(this, point);
		this.x = point.x;
		this.y = point.y;
		return result;
	}


	toBearing = function({bearing, distance}) { 		// draw line from current to new
		const delta = new PolarPoint(radians(this.degrees + bearing), distance);
		const point = this.plusPolar(delta);

		const result = `<line x1="${this.x}" y1="${this.y}" x2="${point.x}" y2="${point.y}"/>`;
		this.heading = Turtle.getHeading(this, point);
		this.x = point.x;
		this.y = point.y;
		return result;
	} */


	bear = function(bearingDegrees, distance=0) { 		// draw line from current to new
		console.log('bear:', arguments);
		const delta = new PolarPoint(radians(this.headingDegrees + bearingDegrees), distance);
		const point = this.plusPolar(delta);
		const result = `<line x1="${this.x}" y1="${this.y}" x2="${point.x}" y2="${point.y}"/>`;
		this.headingDegrees = this.headingDegrees + bearingDegrees;
		this.x = point.x;
		this.y = point.y;
		return result;
	}


	left  = function(bearingDegrees, distance=0) { return this.bear(-bearingDegrees, distance) }
	right = function(bearingDegrees, distance=0) { return this.bear(+bearingDegrees, distance) }



	move = function(dx,dy) {
		console.log('move:', arguments);

		const currentPolar = new PolarPoint(this.headingRadians, this.distanceFromOrigin);

		const newPoint = currentPolar.newPointOffsetXY(dx,-dy);


		const result = `<line x1="${this.x}" y1="${this.y}" x2="${newPoint.x}" y2="${newPoint.y}"/>`;
		this.radians = Turtle.getHeading(this, newPoint);
		this.x = newPoint.x;
		this.y = newPoint.y;
		return result;

	}

	toOrigin = function() {
		this.x = 0;
		this.y = 0;
		this.headingDegrees = 0;
	}

	get marker() {
		const result = `
			<circle cx="${this.x}" cy="${this.y}" class="marker">
				<title>${this.report}</title>
			</circle>
		`;
		return result;
	}


	get report() {
		// title text preserves whitespace, so:
		const result = [
			`x: ${this.x.toPrecision(this.reportPrecision)}`,
			`y: ${this.y.toPrecision(this.reportPrecision)}`,
			`heading:`,
			`	 ${this.headingDegrees.toPrecision(this.reportPrecision)}°`,
			`	 ${this.headingRadians.toPrecision(this.reportPrecision)} rad`,
			`	 ${this.headingRadiansPi.toPrecision(this.reportPrecision)} π rad`,
			`	 ${this.headingRadiansTau.toPrecision(this.reportPrecision)} τ rad`
		].join('\n');
		return result;
	}




	doCommand = function(command) {
		//console.log('Command:', command);
		let result = '';
		if(Array.prototype.isPrototypeOf(command))
		{
			command.forEach(command => {
				result += this.doCommand(command);
			});
		}
		else{
			switch(command.name) {
				case 'p'            : result += this.toPoint(instruction.p); break;
				case 'b','bear'     : result += this.bear(...command.argument); break;
				case 'l','left'     : result += this.left(...command.argument); break;
				case 'r','right'    : result += this.right(...command.argument); break;
				case 'm'            : result += this.move(...command.argument); break;
				case 'marker'       : result += this.marker; break;
				case 'o'            : result += this.toOrigin(); break;
				default             : result += `<!-- ${instruction} -->`; break;
			}
		}
		//console.log(instruction);
		return result;
	}



	static getHeading = function(point1, point2) {
		const result = Math.PI/2 + Math.atan2(point2.y-point1.y, point2.x-point1.x);
		return result;
	}



	static getCommands = function(string) {
		const result = [];
		const lineArray = string.trim().split('\n');

		lineArray.forEach(
			(line) => {
				const match = line.match(/(\w+)(\s.*)?/);
				if (match) {
					//console.log(match);
					const cmd = match[1];
					const arg = (match[2]) ? this.parseArgs(match[2]) : [];
					result.push(new Command(cmd, arg));
				}
			}
		);

		return result;
	}

	static parseArgs(argString) {
		const argArray = argString.split(',');

		const result = argArray.map(
			(element) => { return Number.parseInt(element); }
		);
		return result;
	}

	//
	//
	//

	plusPoint = function(point) {
		return new Point(
			this.x + point.x,
			this.y + point.y
		);
	}

	plusPolar = function(polarPoint) { // new
		const temp = polarPoint.toPoint();
		return this.plusPoint(temp);
	}


	get distanceFromOrigin() {
		return Math.hypot(this.x, this.y);
	}



}/* Turtle */



class Command {
	constructor(name, argument) {
		this.name = name;
		this.argument = argument;
	}
	name = '';
	argument = [];
}