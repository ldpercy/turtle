



class PolarPoint {
	constructor(radian=0, radius=0, precision=12)
	{
		this.radian = radian;
		this.radius = radius;
		this.precision = precision;
	}

	toPoint = function() {
		return new Point(
			this.radius * Math.sin(this.radian),
			this.radius * -Math.cos(this.radian)
		)
	}

	plus = function(polarPoint) {
		return this.toPoint().plus(polarPoint.toPoint()).toPolarPoint();
		// this way is pretty dumb, figure out a better way
		// the lengths should add arithmetically

		// this one is absolute
	}

	/*
	Need to figure out whether the angles are absolute or relative
	Either interpretation could make sense - need

	*/


	// this is really wrong I think
	toPointPolarOffset(polarPoint) {  // another polar point represents the deltas
		return new Point(
			(this.radius + polarPoint.radius) * Math.sin(this.radian + polarPoint.radian),
			(this.radius + polarPoint.radius) * -Math.cos(this.radian + polarPoint.radian)
		)
	}


	/* move
	A single-step turtle graphics kind of move relative to the current point
	Takes the current radian coordinate as the base heading and the new heading is relative to it.
	Ie a 0 heading will continue in the same direction
	*/
	move = function(distance, heading) {
		const delta = new PolarPoint(this.radian+heading, distance);
		//console.log(delta);
		return this.plus(delta);
	}


	toPointCartesianOffset(dx, dy) {

		let x = 0, y = 0;



		return new Point(
			/* tbd */
			(this.radius) * Math.sin(this.radian),
			(this.radius) * -Math.cos(this.radian)
		)
	}


}/* PolarPoint */





const tau = 2 * Math.PI;

function degrees(radians) { return 360 * radians/tau}


function rotatePoint(point, radian, center = new Point()) {
	const length = lineLength(center, point);
	const pointRadian = lineRadian(center, point);
	//console.log(length, pointRadian);
	const result = new PolarPoint(pointRadian+radian, length).toPoint().plus(center);
	return result;
}

function lineLength(point1, point2) {
	//const result = Math.sqrt(((point2.x - point1.x)**2) + ((point2.y - point1.y)**2));
	const result = Math.hypot((point2.x - point1.x), (point2.y - point1.y));
	return result;
}

/* Uses the the y axis for 0 radians
*/
function lineRadian(center, point) {
	const result = Math.PI/2 + Math.atan2(point.y-center.y, point.x-center.x)  ;
	return result;
}
