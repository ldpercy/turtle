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


	//
	//	getters
	//

	get showTurtle() {
		return element.pageForm.showTurtle.checked;
	}

	get rotatePage() {
		return element.pageForm.rotatePage.checked;
	}

	get centerTurtle() {
		return element.pageForm.centerTurtle.checked;
	}

	get showCartesian() {
		return element.pageForm.showCartesian.checked;
	}

	get showPolar() {
		return element.pageForm.showPolar.checked;
	}

	get colourScheme() {
		return element.pageForm.colourScheme.value;
	}

	get cartesianOpacity() {
		return element.pageForm.cartesianOpacity.value;
	}

	get polarOpacity() {
		return element.pageForm.polarOpacity.value;
	}

	get mouseMode() {
		return element.pageForm['mouse-click'].value;
	}

	get drawColour() {
		return element.drawingForm.colour.value;
	}

	get strokeWidth() {
		return element.drawingForm.strokeWidth.value;
	}

	get showMarkers() {
		return element.drawingForm.showMarkers.checked;
	}

	get showStroke() {
		return element.drawingForm.showStroke.checked;
	}



	//
	//	other
	//


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
