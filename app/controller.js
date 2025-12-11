
//	controller
//

import { Turtle } from "../[library]/Turtle.js";
import { turtleApp } from "./turtleApp.js";
import { ui } from './view-html-ui.js';
import { svg } from "./view-svg.js";



//
//	event listeners
//

export function commandTabListener(event) {
	const newCommandSet = Number.parseInt(event.target.attributes['data-commandSet'].value);
	ui.showCommandSet(newCommandSet);
}


/* export function svgKeyListener(event) {
	//console.log('svgKeyListener', event);
	//event.stopPropagation();
} */


const keyFunctionMap = {
	'd'	: doCommands,
	'c'	: svg.clearDrawing,
	'o'	: toOrigin,

	'!'	: () => ui.showCommandSet(1),		// ! == shift-1
	'@'	: () => ui.showCommandSet(2),		// @ == shift-2
	'#'	: () => ui.showCommandSet(3),		// # == shift-3

	'T'	: toggleTurtle,
	'C'	: toggleCenter,
	'R'	: toggleRotate,

	'+'	: zoomIn,
	'z'	: zoomIn,
	'Z'	: zoomOut,
	'-'	: zoomOut,

	'?'	: ui.togglePopover,
};


export function documentKeyListener(event) {
	//console.log('documentKeyListener', event);

	if (keyFunctionMap[event.key]) {
		event.preventDefault();
		keyFunctionMap[event.key]();
	}

}/* documentKeyListener */






export function svgClickListener(event) {
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
	const mouseMode = ui.mouseMode;

	if (mouseMode === 'info') {
		svg.drawPointInfo(pagePoint.x, pagePoint.y);
	}
	else if (mouseMode === 'draw') {
		const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;
		doCommand(cmd);
	}
	else if (mouseMode === 'move')
	{
		const cmd = `^xyr ${pagePoint.x}, ${-pagePoint.y}`;
		doCommand(cmd);
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






//
//	handlers
//

export function updatePage() {
	svg.updatePage();
}

export function toOrigin() {
	//console.log('toOrigin');
	doCommand('^o');
	svg.updateTurtle();
	ui.updateTurtleInfo();
}


export function doCommands() {
	const commands = Turtle.getCommands(ui.commandString);
	//console.log('Commands:', commands);

	const commandOutput = turtleApp.turtle.doCommands(commands);
	svg.updateTurtle();
	svg.draw(commandOutput);
	ui.updateTurtleInfo();
}/* doCommands */


function doCommand(cmdString) {
	const commands = Turtle.getCommands(cmdString);
	//console.log(commands);
	const commandOutput = turtleApp.turtle.doCommands(commands);
	svg.updateTurtle();
	svg.draw(commandOutput);
	ui.updateTurtleInfo();
}



function toggleTurtle() {
	ui.showTurtle = !ui.showTurtle;
	svg.showTurtle = ui.showTurtle;
}

function toggleCenter() {
	ui.centerTurtle = !ui.centerTurtle;
	svg.updatePageTransform();
}

function toggleRotate() {
	ui.rotatePage = !ui.rotatePage;
	svg.updatePageTransform();
}



function zoomIn() {
	//console.log('zoomIn');
	ui.zoom++;
	svg.updatePageTransform();
}

function zoomOut() {
	//console.log('zoomOut');
	ui.zoom--;
	svg.updatePageTransform();
}
