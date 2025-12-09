//
//	html-ui
//

import { HTMLApp } from "../[library]/HTMLApp.js";
import { turtleApp } from "./turtleApp.js";

let element;
const elementMap = {
	commandInput	: 'input-command',
	turtleForm		: 'form-turtle',
	pageForm		: 'form-page',
	drawingForm		: 'form-drawing',
	svg				: 'svg-element',
};

let currentCommandSet = 1;


/* init
*/
export function init() {
	element = HTMLApp.buildElementMap(document, elementMap);

	//console.log(element);

	const commandSet = Number.parseInt(element.turtleForm['input-commandSet-active'].value) || 1;
	showCommandSet((commandSet), false);
}



export function showCommandSet(commandSet, save=true) {
	//console.debug('showCommandSet', commandSet);

	if (save) {
		// copy command textarea into it's hidden input
		element.turtleForm[`input-commandSet-${currentCommandSet}`].value = element.commandInput.value;
		document.getElementById(`tab-commandSet-${currentCommandSet}`).classList.remove('active');
		document.getElementById(`tab-commandSet-${currentCommandSet}`).title = element.commandInput.value;
	}

	// copy new tab's command set into the texarea
	currentCommandSet = commandSet;
	element.turtleForm['input-commandSet-active'].value = commandSet;

	element.commandInput.value = element.turtleForm[`input-commandSet-${currentCommandSet}`].value;
	document.getElementById(`tab-commandSet-${currentCommandSet}`).classList.add('active');
}



export function updateHiddenInput() {
	// update the hidden command input - this is a hack, the current textarea value need to be saved properly onchange
	element.turtleForm[`input-commandSet-${currentCommandSet}`].value = element.commandInput.value;
}

export function getMouseMode() {
	return element.pageForm['mouse-click'].value;
}

export function getDrawColour() {
	return element.drawingForm.colour.value;
}

export function getStrokeWidth() {
	return element.drawingForm.strokeWidth.value;
}

export function getShowMarkers() {
	return element.drawingForm.showMarkers.checked;
}

export function getShowStroke() {
	return element.drawingForm.showStroke.checked;
}



export function getScale() {

	const zoomPower = Number.parseInt(element.pageForm.zoom.value);

	const scale = 2 ** zoomPower;

	//console.log(scale);

	//const newViewBox = viewBox.toStringScale(scale);
	//console.log(newViewBox);
	//svgElement.setAttribute('viewBox',newViewBox);
	return scale;
}
