//
// geometry
//









/*
I need a standard syntax for builders/constructors vs mutators - in classes and in general.
Also need to do some experiments with JS accessors and class methods to see how they'll help here.

A first approach would be to prefix builders with 'new' to make it obvious we're returning a new object base upon the instance and parameters.

*/


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



class Angle {
	#degrees = 0;

	constructor(degrees=0) {
		this.#degrees = degrees;
	}

	get degrees()    { return this.#degrees; }
	get radians()    { return this.#degrees / 180 * Math.PI; }
	get radiansPi()  { return this.#degrees / 180; }
	get radiansTau() { return this.#degrees / 360; }

	set degrees(degrees)         { this.#degrees = degrees; return this; }
	set radians(radians)         { this.#degrees = radians * 180 / Math.PI; return this; }
	set radiansPi(radiansPi)     { this.#degrees = radiansPi * 180; return this; }
	set radiansTau(radiansTau)   { this.#degrees = radiansTau * 360; return this; }

}/* Angle */