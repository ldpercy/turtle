class Turtle {

	#position = new Point();
	heading = new Angle();
	#origin = new Point(0,0);

	constructor(x=0, y=0, heading=0, digits=12) {
		this.#position.x = x;
		this.#position.y = y;
		this.heading.degrees = heading;
		this.precision.digits = digits;
	}


}