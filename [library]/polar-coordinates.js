
function Point(x, y)
{
	this.x = x;
	this.y = y;
}

function polarPoint(radians, radius)
{
	return new Point(
		radius * Math.sin(radians),
		radius * -Math.cos(radians)
	)
}


const tau = 2 * Math.PI;

function degrees(radians) { return 360 * radians/tau}
