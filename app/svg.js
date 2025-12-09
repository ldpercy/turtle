//
//	svg
//

import { HTMLApp } from "../[library]/HTMLApp.js";
import { turtleApp } from "./turtleApp.js";

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


export function init() {
	element = HTMLApp.buildElementMap(svgElement, elementMap);

	//console.log('svg element', element);
}








export function	drawPointInfo(svgX, svgY) {
	const pointInfoSvg = this.turtle.pointInfo(svgX, -svgY);

	document.getElementById('group-cartesianPoint').innerHTML = pointInfoSvg.cartesian;
	document.getElementById('group-polarPoint').innerHTML = pointInfoSvg.polar;
}

export function clearPoint() {
	document.getElementById('group-cartesianPoint').innerHTML = '';
	document.getElementById('group-polarPoint').innerHTML = '';
}



