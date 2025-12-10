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
	//	Getters
	//


	/** @returns {string} */
	get commandString() {
		return element.commandInput.value;
	}

	/** @returns {boolean} */
	get showTurtle() {
		return element.pageForm.showTurtle.checked;
	}

	/** @returns {boolean} */
	get centerTurtle() {
		return element.pageForm.centerTurtle.checked;
	}

	/** @returns {boolean} */
	get rotatePage() {
		return element.pageForm.rotatePage.checked;
	}

	/** @returns {string} */
	get colourScheme() {
		return element.pageForm.colourScheme.value;
	}

	/** @returns {number} */
	get zoom() {
		return element.pageForm.zoom.value;
	}

	/** @returns {boolean} */
	get showCartesian() {
		return element.pageForm.showCartesian.checked;
	}

	/** @returns {boolean} */
	get showPolar() {
		return element.pageForm.showPolar.checked;
	}

	/** @returns {number} */
	get cartesianOpacity() {
		return element.pageForm.cartesianOpacity.value;
	}

	/** @returns {number} */
	get polarOpacity() {
		return element.pageForm.polarOpacity.value;
	}

	/** @returns {string} */
	get mouseMode() {
		return element.pageForm['mouse-click'].value;
	}

	/** @returns {string} */
	get drawColour() {
		return element.drawingForm.colour.value;
	}

	/** @returns {string} */
	get strokeWidth() {
		return element.drawingForm.strokeWidth.value;
	}

	/** @returns {boolean} */
	get showMarkers() {
		return element.drawingForm.showMarkers.checked;
	}

	/** @returns {boolean} */
	get showStroke() {
		return element.drawingForm.showStroke.checked;
	}


	//
	//	Setters
	//

	/** @param {number} zoomLevel */
	set zoom(zoomLevel) {
		element.pageForm.zoom.value = zoomLevel;
	}




	//
	//	other
	//


	updateTurtleInfo() {
		element.turtleInfo.innerHTML = turtleApp.turtle.report;
	}




	/**
	 * @param {number} commandSet
	 * @param {boolean} [save]
	 */
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
