//
//	svg
//

import { HTMLApp } from "../[library]/HTMLApp.js";
import * as Maths from "../[library]/Maths.js";
import * as SVG from "../[library]/SVG.js";
import { turtleApp } from "./turtleApp.js";
import * as ui from "./html-ui.js";


let element;
const elementMap = {
	page			: 'group-page',
	cartesianGroup  : 'group-cartesian',
	cartesianGrid	: 'group-cartesianGrid',
	polarGroup 		: 'group-polar',
	polarGrid 		: 'group-polarGrid',
	drawing			: 'group-drawing',
	turtleIcon		: 'turtle-terry',
};

const svgElement = document.getElementById('svg-element');
const precision = {
	report : 6
};


export function init() {
	element = HTMLApp.buildElementMap(svgElement, elementMap);

	//console.log('svg element', element);
}



export function	drawGrid() {
	const cartesianGrid = new SVG.CartesianGrid(turtleApp.space, turtleApp.page);
	document.getElementById('group-cartesianGrid').innerHTML = cartesianGrid.toString();

	const polarGrid = new SVG.PolarGrid(turtleApp.space, turtleApp.page);
	document.getElementById('group-polarGrid').innerHTML = polarGrid.toString();
}



export function draw(string) {
	element.drawing.innerHTML += string;
}

export function clearDrawing() {
	element.drawing.innerHTML = '';
}


export function	drawPointInfo(svgX, svgY) {
	const pointInfoSvg = pointInfo(svgX, -svgY);
	document.getElementById('group-cartesianPoint').innerHTML = pointInfoSvg.cartesian;
	document.getElementById('group-polarPoint').innerHTML = pointInfoSvg.polar;
}


export function clearPoint() {
	document.getElementById('group-cartesianPoint').innerHTML = '';
	document.getElementById('group-polarPoint').innerHTML = '';
}








export function clickListener(event) {
	//console.debug('svgClickListener', event);
	const domPoint = new DOMPoint(event.clientX, event.clientY);

	const pageElement = this.element.svg.getElementById('group-page');

	// Get point in page SVG space
	const pagePoint = domPoint.matrixTransform(pageElement.getScreenCTM().inverse());
	//console.debug('pagePoint', pagePoint);

	// /this.drawPoint(pagePoint.x, pagePoint.y);	// adding this line seems to cancel subsequent events - do I need to re-propagate the event or something?

	//const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;
	//console.debug('svgClickListener', cmd);
	//this.doCommand(cmd);
	const mouseMode = ui.getMouseMode()

	if (mouseMode === 'info') {
		drawPointInfo(pagePoint.x, pagePoint.y);
	}
	else if (mouseMode === 'draw') {
		const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;
		this.doCommand(cmd);
	}
	else if (mouseMode === 'move')
	{
		const cmd = `^xyr ${pagePoint.x}, ${-pagePoint.y}`;
		this.doCommand(cmd);
	}

}/* svgClickListener */


/* svgDblClickListener
* /
svgDblClickListener(event) {   // not firing for some reason???
	//console.log('svgDblClickListener', event);

	const domPoint = new DOMPoint(event.clientX, event.clientY);
	const pageElement = document.getElementById('group-page');

	// Get point in page SVG space
	const pagePoint = domPoint.matrixTransform(pageElement.getScreenCTM().inverse());

	const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;

	//console.debug('svgClickListener', cmd);

	this.doCommand(cmd);

}/ * svgDblClickListener */




/* pointInfo
*/
export function pointInfo(x, y) {
	const result = {
		cartesian: '',
		polar : '',
	};

	const coords = new turtleApp.space.CartesianCoordinates(x,y);

	const point = turtleApp.space.newPoint('point marker');
	point.cartesian = coords;

	const svgX = x;
	const svgY = -y;

	const cartesianInfo = [
		`x: ${point.x.toPrecision(precision.report)}`,
		`y: ${point.y.toPrecision(precision.report)}`,
	];

	const polarInfo = [
		`r: ${point.radius.toPrecision(precision.report)}`,
		`a: ${point.angle.degrees.toPrecision(precision.report)}°`,
		`a: ${point.angle.radians.toPrecision(precision.report)} rad`,
		`a: ${point.angle.radiansPi.toPrecision(precision.report)} π rad`,
		`a: ${point.angle.radiansTau.toPrecision(precision.report)} τ rad`,
	];

	const pointReport = [
		`cartesian:`,
		`	${cartesianInfo.join('\n\t')}`,
		`polar:`,
		`	${polarInfo.join('\n\t')}`,
		`svg:`,
		`	x: ${svgX.toPrecision(precision.report)}`,
		`	y: ${svgY.toPrecision(precision.report)}`,
	].join('\n');


	result.cartesian = `
		<line x1="${svgX}" y1="0" x2="${svgX}" y2="${svgY}"><title>${cartesianInfo.join('\n')}</title></line>
		<line x1="0" y1="${svgY}" x2="${svgX}" y2="${svgY}"><title>${cartesianInfo.join('\n')}</title></line>
		<use href="#def-point" class="use-point" x="${svgX}" y="${svgY}">
			<title>${pointReport}</title>
		</use>
	`;

	const angle180 = Maths.degrees180(point.angle.degrees);
	const sweepFlag = (angle180 >= 0) ? 1 : 0;

	result.polar = `
		<line x1="0" y1="0" x2="${point.x}" y2="${-point.y}"><title>${polarInfo.join('\n')}</title></line>
		<circle r="${point.radius}">
			<title>r: ${point.radius.toPrecision(precision.report)}</title>
		</circle>
		<path d="M 0,${-point.radius} A ${point.radius},${point.radius} 0 0 ${sweepFlag} ${svgX},${svgY}">
			<title>${polarInfo.join('\n')}</title>
		</path>
		<use href="#def-point" class="use-point" x="${svgX}" y="${svgY}">
			<title>${pointReport}</title>
		</use>
	`;

	return result;
}/* pointInfo */






export function updateDrawing() {

	element.drawing.style.setProperty('--draw-colour', ui.getDrawColour());
	element.drawing.style.setProperty('--drawing-stroke-width', ui.getStrokeWidth());

	if (ui.getShowMarkers()) {
		element.drawing.classList.add('show-marker');
	}
	else {
		element.drawing.classList.remove('show-marker');
	}

	if (ui.getShowStroke()) {
		element.drawing.style.setProperty('--drawing-stroke-width', ui.getStrokeWidth());
	}
	else {
		element.drawing.style.setProperty('--drawing-stroke-width', 0);
	}

}/* updateDrawing */
