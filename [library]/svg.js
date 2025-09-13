//
// SVG
//

class Element {
	constructor(id='', classString='') {
		this.id				= id;
		this.classString	= classString;
	}
}

function getElementAttributes(element) {
	const result = `
		id="${element.id}" class="${element.classString}"
	`;
	return result;
}



function svgPoint(point) {
	if (point instanceof PolarPoint) point = point.toPoint();
	const result = `
		<circle cx="${point.x}" cy="${point.y}" r="10" class="point">
			<title>Point: ${JSON.stringify(point)}
				distance: ${point.distanceFromOrigin }
				radian:  ${point.radian }
			</title>
		</circle>
	`;
	return result;
}



class Rect {
	constructor(x, y, width, height, rx=0, ry=0, option={}, element=new Element(),) {
		this.x 		= x;
		this.y 		= y;
		this.width	= width;
		this.height	= height;
		this.rx		= rx;
		this.ry		= ry;
		this.option = option;
		this.element = element;
	}

	toString  = function() {
		const result = `
			<rect ${getElementAttributes(this.element)} x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" rx="${this.rx}" ry="${this.ry}">
				<title>${JSON.stringify(this)}</title>
			</rect>
		`;
		return result;
	}
}



class Line {
	constructor(x1, y1, x2, y2, option={}, element=new Element()) {
		this.x1		= x1;
		this.y1		= y1;
		this.x2		= x2;
		this.y2		= y2;
		this.option = option;
		this.element = element;
	}

	set start(point) {
		this.x1 = point.x;
		this.y1 = point.y;
	}

	set end(point) {
		this.x2 = point.x;
		this.y2 = point.y;
	}


	toString = function() {
		const result = `
			<line ${getElementAttributes(this.element)} x1="${this.x1}" y1="${this.y1}" x2="${this.x2}" y2="${this.y2}">
				<title>${JSON.stringify(this)}</title>
			</line>
		`;
		return result;
	}

}/* Line */





