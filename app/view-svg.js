//
//	svg
//

import { HTMLApp } from "../[library]/HTMLApp.js";
import * as Maths from "../[library]/Maths.js";
import * as SVG from "../[library]/SVG.js";
import { turtleApp } from "./turtleApp.js";
import { ui } from './view-html-ui.js';


let element = {};
const elementMap = {
	page			: 'group-page',
	cartesianGroup  : 'group-cartesian',
	cartesianGrid	: 'group-cartesianGrid',
	polarGroup 		: 'group-polar',
	polarGrid 		: 'group-polarGrid',
	drawing			: 'group-drawing',
	turtleIcon		: 'turtle-terry',
	turtleTitle		: 'title-terry',
};


const precision = {
	report : 6
};

class SVGView {


	constructor() {
		const svgElement = document.getElementById('svg-element');
		element = HTMLApp.buildElementMap(svgElement, elementMap);

		//console.log('svg element', element);
	}



	drawGrid() {
		const cartesianGrid = new SVG.CartesianGrid(turtleApp.space, turtleApp.page);
		document.getElementById('group-cartesianGrid').innerHTML = cartesianGrid.toString();

		const polarGrid = new SVG.PolarGrid(turtleApp.space, turtleApp.page);
		document.getElementById('group-polarGrid').innerHTML = polarGrid.toString();
	}



	draw(string) {
		element.drawing.innerHTML += string;
	}

	clearDrawing() {
		element.drawing.innerHTML = '';
	}


	drawPointInfo(svgX, svgY) {
		const pointInfoSvg = this.pointInfo(svgX, -svgY);
		document.getElementById('group-cartesianPoint').innerHTML = pointInfoSvg.cartesian;
		document.getElementById('group-polarPoint').innerHTML = pointInfoSvg.polar;
	}


	clearPoint() {
		document.getElementById('group-cartesianPoint').innerHTML = '';
		document.getElementById('group-polarPoint').innerHTML = '';
	}




	/* pointInfo
	*/
	pointInfo(x, y) {
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



	updateDrawing() {

		element.drawing.style.setProperty('--draw-colour', ui.drawColour);
		element.drawing.style.setProperty('--drawing-stroke-width', ui.strokeWidth);

		if (ui.showMarkers) {
			element.drawing.classList.add('show-marker');
		}
		else {
			element.drawing.classList.remove('show-marker');
		}

		if (ui.showStroke) {
			element.drawing.style.setProperty('--drawing-stroke-width', ui.strokeWidth);
		}
		else {
			element.drawing.style.setProperty('--drawing-stroke-width', 0);
		}

	}/* updateDrawing */



	updateTurtle() {
		element.turtleIcon.setAttribute(
			'transform',
			`translate(${turtleApp.turtle.svgX},${turtleApp.turtle.svgY}) rotate(${turtleApp.turtle.position.degrees})`
		);

		this.updatePageTransform();
		element.turtleTitle.innerHTML = turtleApp.turtle.report;
	}/* updateTurtle */



	updatePageTransform() {

		//console.log(this.turtle);

		const rotate = turtleApp.turtle.position.degrees;

		const rotateTransform    = (ui.rotatePage)   ? `rotate(${-rotate},0,0)` : 'rotate(0,0,0)';
		const translateTransform = (ui.centerTurtle) ? `translate(${-turtleApp.turtle.svgX},${-turtleApp.turtle.svgY})` : 'translate(0,0)';

		const scaleTransform = `scale(${ui.getScale()})`;

		// TODO: see if this can be applied as separate attributes, or combined into a single transform matrix

		const transform = `${scaleTransform} ${rotateTransform} ${translateTransform} `;

		element.page.setAttribute('transform', transform);
	}/* updatePageTransform */



	/** @param {boolean} show */
	set showTurtle(show) {
		element.turtleIcon.style.display = (show) ? '' : 'none';
	}


	updatePage() {
		this.showTurtle = ui.showTurtle;

		if (ui.showCartesian) {
			element.cartesianGroup.style.display = '';
		}
		else {
			element.cartesianGroup.style.display = 'none';
		}

		if (ui.showPolar) {
			element.polarGroup.style.display = '';
		}
		else {
			element.polarGroup.style.display = 'none';
		}

		if (ui.colourScheme === 'light')
		{
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		}
		else {
			document.body.classList.remove('light');
			document.body.classList.add('dark');
		}

		element.cartesianGrid.style.setProperty('opacity', ui.cartesianOpacity);
		element.polarGrid.style.setProperty('opacity', ui.polarOpacity);

		this.updatePageTransform();

	}/* updatePage */

}/* SVGView */


export const svg = new SVGView();