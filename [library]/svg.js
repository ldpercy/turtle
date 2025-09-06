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



function getPoint(point) {
	const result = `
		<circle cx="${point.x}" cy="${point.y}" r="10" class="point">
			<title>${JSON.stringify(point)}</title>
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
}

function getRect(rect) {
	const result = `
		<rect ${getElementAttributes(rect.element)} x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" rx="${rect.rx}" ry="${rect.ry}">
			<title>${JSON.stringify(rect)}</title>
		</rect>
	`;
	return result;
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
}


function getLine(line) {
	result = `
		<line ${getElementAttributes(line.element)} x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}">
			<title>${JSON.stringify(line)}</title>
		</line>
	`;
	return result;
}


