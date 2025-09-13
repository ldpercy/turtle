

/* Turtle
*/
class Turtle {

	#heading = 0; //

	constructor(x=0, y=0, degrees=0, precision=12) {
		this.x = x;
		this.y = y;
		this.degrees = degrees;
		this.precision = precision;
	}


	//
	// Accessors
	//

	get radians() { return this.heading; }
	get degrees() { return (this.heading/Math.TAU) * 360; }

	set radians(radians) { this.heading = radians; }
	set degrees(degrees) { this.heading = (degrees/360) * Math.TAU; }




	toPoint = function(point) { 		// draw line from current to new
		const result = `<line x1="${this.x}" y1="${this.y}" x2="${point.x}" y2="${point.y}"/>`;
		this.heading = Turtle.getHeading(this, point);
		this.x = point.x;
		this.y = point.y;
		return result;
	}


	toBearing = function({bearing, distance}) { 		// draw line from current to new
		const delta = new PolarPoint(radians(this.degrees + bearing), distance);
		//console.log(delta);
		const point = this.plusPolar(delta);

		const result = `<line x1="${this.x}" y1="${this.y}" x2="${point.x}" y2="${point.y}"/>`;
		this.heading = Turtle.getHeading(this, point);
		this.x = point.x;
		this.y = point.y;
		return result;
	}


	toOrigin = function() {
		this.x = 0;
		this.y = 0;
	}

	get report() {
		const result = `
			<circle cx="${this.x}" cy="${this.y}" class="report">
				<title>
					x: ${this.x}
					y: ${this.y}
					heading: ${this.degrees.toPrecision(5)}
				</title>
			</circle>
		`;
		return result;
	}



	do = function(instruction) {
		//console.log(instruction);
		let result = '';
		if(Array.prototype.isPrototypeOf(instruction))
		{
			instruction.forEach(instruction => {
				result += this.do(instruction);
			});
		}
		else{
			switch(instruction.i) {
				case 'p'     	: result += this.toPoint(instruction.p); break;
				case 'b'        : result += this.toBearing(instruction.p); break;
				case 'r'        : result += this.report; break;
				case 'o'        : result += this.toOrigin(); break;
				default         : result += `<!-- ${instruction} -->`; break;
			}
		}
		//console.log(instruction);
		return result;
	}







	static getHeading = function(point1, point2) {
		const result = Math.PI/2 + Math.atan2(point2.y-point1.y, point2.x-point1.x);
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






}/* Turtle */