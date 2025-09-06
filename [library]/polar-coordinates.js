



class PolarPoint {
	constructor(radian, radius)
	{
		this.radian = radian;
		this.radius = radius;
	}

	toPoint = function() {
		return new Point(
			this.radius * Math.sin(this.radian),
			this.radius * -Math.cos(this.radian)
		)
	}

	toPointPolarOffset(polarPoint) {  // another polar point represents the deltas
		return new Point(
			(this.radius + polarPoint.radius) * Math.sin(this.radian + polarPoint.radian),
			(this.radius + polarPoint.radius) * -Math.cos(this.radian + polarPoint.radian)
		)
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
