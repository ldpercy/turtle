
//	controller
//


import { turtleApp } from "./turtleApp.js";
import { ui } from './view-html-ui.js';
import { svgView } from "./view-svg.js";
//import { turtle } from "../[library]/Turtle.js";
import * as turtleCommand from "./TurtleCommand.js";


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
	'c'	: svgView.clearDrawing,
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

	//console.debug('svgClickListener', cmd);

	const mouseMode = ui.mouseMode;

	if (mouseMode === 'info') {
		svgView.drawPointInfo(pagePoint.x, pagePoint.y);
	}
	else if (mouseMode === 'draw') {
		const cmd = `xyTurn ${pagePoint.x}, ${-pagePoint.y}`;
		doCommand(cmd);
	}
	else if (mouseMode === 'move')
	{
		const cmd = `~xyTurn ${pagePoint.x}, ${-pagePoint.y}`;
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

	const cmd = `xyTurn ${pagePoint.x}, ${-pagePoint.y}`;

	//console.debug('svgClickListener', cmd);

	this.doCommand(cmd);

}/ * svgDblClickListener */






//
//	handlers
//

export function updatePage() {
	svgView.updatePage();
}

export function toOrigin() {
	//console.log('toOrigin');
	//const cmd = new turtleCommand.Command('origin');
	doCommand('~origin');
	svgView.updateTurtle();
	ui.updateTurtleInfo();
}


export function doCommands() {
	const commands = turtleCommand.generateCommands(ui.commandString);
	//console.log('Commands:', commands);

	const commandOutput = turtleApp.turtle.doCommands(commands);
	svgView.updateTurtle();
	svgView.draw(commandOutput);
	ui.updateTurtleInfo();
}/* doCommands */


function doCommand(commandString) {
	const command = turtleCommand.createCommand(commandString);
	//console.log(commands);
	const commandOutput = turtleApp.turtle.doCommand(command);
	svgView.updateTurtle();
	svgView.draw(commandOutput);
	ui.updateTurtleInfo();
}



function toggleTurtle() {
	ui.showTurtle = !ui.showTurtle;
	svgView.showTurtle = ui.showTurtle;
}

function toggleCenter() {
	ui.centerTurtle = !ui.centerTurtle;
	svgView.updatePageTransform();
}

function toggleRotate() {
	ui.rotatePage = !ui.rotatePage;
	svgView.updatePageTransform();
}



function zoomIn() {
	//console.log('zoomIn');
	ui.zoom++;
	svgView.updatePageTransform();
}

function zoomOut() {
	//console.log('zoomOut');
	ui.zoom--;
	svgView.updatePageTransform();
}
