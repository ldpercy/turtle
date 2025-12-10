
//	controller
//


import { ui } from './html-ui.js';
import * as svg from "./svg.js";
import { Turtle } from "../[library]/Turtle.js";
import { turtleApp } from "./turtleApp.js";


//
//	event listeners
//

export function commandTabListener(event) {
	//console.debug('tabListener', arguments);
	//console.debug('tabListener', event.target);
	const newCommandSet = Number.parseInt(event.target.attributes['data-commandSet'].value);
	//console.log(this);
	//this.showCommandSet(newCommandSet);
	ui.showCommandSet(newCommandSet);
}


export function svgKeyListener(event) {
	//console.log('svgKeyListener', event);
	//event.stopPropagation();
}


export function documentKeyListener(event) {
	//console.log('documentKeyListener', event);


	switch(event.key) {
		case 'd'	: doCommands(); break;
		case 'c'	: svg.clearDrawing(); break;
		case 'o'	: toOrigin(); break;

		case '!'	: ui.showCommandSet(1); break;
		case '@'	: ui.showCommandSet(2); break;
		case '#'	: ui.showCommandSet(3); break;

		//case 'C'	: ui.showCommandSet(3); break;
		//case '+'	: ui.zoomIn(); break;
		//case '-'	: ui.zoomOut(); break;

		default     : /* do nothing */; break;
	}


}/* documentKeyListener */






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



export function toOrigin() {
	//turtle.toOrigin();
	this.turtle.doCommand({name:'o'});
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