//
//	html-ui
//

import { HTMLApp } from "../[library]/HTMLApp.js";
import { turtleApp } from "./turtleApp.js";


let element;
const elementMap = {
	turtleForm		: 'form-turtle',
	pageForm		: 'form-page',
	drawingForm		: 'form-drawing',
	commandInput	: 'input-command',
	turtleInfo		: 'turtle-info',
};

let currentCommandSet = 1;



class HTMLUserInterface {


	constructor() {
		element = HTMLApp.buildElementMap(document, elementMap);

		//console.log(element);

		const commandSet = Number.parseInt(element.turtleForm['input-commandSet-active'].value) || 1;
		this.showCommandSet((commandSet), false);
	}


	updateTurtleInfo() {
		element.turtleInfo.innerHTML = turtleApp.turtle.report;
	}



	tabListener(event) {
		//console.debug('tabListener', arguments);
		//console.debug('tabListener', event.target);
		const newCommandSet = Number.parseInt(event.target.attributes['data-commandSet'].value);
		this.showCommandSet(newCommandSet);
	}


	showCommandSet(commandSet, save=true) {
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










	updateHiddenInput() {
		element.turtleForm[`input-commandSet-${currentCommandSet}`].value = element.commandInput.value;
	}



	//
	//	ui getters
	//

	getShowTurtle() {
		return element.pageForm.showTurtle.checked;
	}

	getRotatePage() {
		return element.pageForm.rotatePage.checked;
	}

	getCenterTurtle() {
		return element.pageForm.centerTurtle.checked;
	}

	getShowCartesian() {
		return element.pageForm.showCartesian.checked;
	}

	getShowPolar() {
		return element.pageForm.showPolar.checked;
	}

	getColourScheme() {
		return element.pageForm.colourScheme.value;
	}


	getCartesianOpacity() {
		return element.pageForm.cartesianOpacity.value;
	}

	getPolarOpacity() {
		return element.pageForm.polarOpacity.value;
	}

	getMouseMode() {
		return element.pageForm['mouse-click'].value;
	}

	getDrawColour() {
		return element.drawingForm.colour.value;
	}

	getStrokeWidth() {
		return element.drawingForm.strokeWidth.value;
	}

	getShowMarkers() {
		return element.drawingForm.showMarkers.checked;
	}

	getShowStroke() {
		return element.drawingForm.showStroke.checked;
	}



	getScale() {

		const zoomPower = Number.parseInt(element.pageForm.zoom.value);

		const scale = 2 ** zoomPower;

		//console.log(scale);

		//const newViewBox = viewBox.toStringScale(scale);
		//console.log(newViewBox);
		//svgElement.setAttribute('viewBox',newViewBox);
		return scale;
	}


}/* HTMLUserInterface */


export const ui = new HTMLUserInterface();
