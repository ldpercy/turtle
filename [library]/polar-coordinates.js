
class Point {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}

}/* Point */


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

	toPointPolarOffset(dRadian, dRadius) {
		return new Point(
			(this.radius + dRadius) * Math.sin(this.radian + dRadian),
			(this.radius + dRadius) * -Math.cos(this.radian + dRadian)
		)
	}


}/* PolarPoint */





const tau = 2 * Math.PI;

function degrees(radians) { return 360 * radians/tau}
