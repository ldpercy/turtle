
//	controller
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { turtleApp } from "./turtleApp.js";
import { ui } from './html-ui.js';
import { pageArea } from "./page-area.js";
//import { turtle } from "../[library]/Turtle.js";
import * as turtleCommand from "./TurtleCommand.js";





class Controller {


	constructor() {
		// /this.element = HTMLApp.buildElementMap(document, this.elementMap)
		HTMLApp.addEventListeners(this.eventListeners, this);
		//console.debug('controller constructor');
	}


	elementMap = {
		turtleForm		: 'form-turtle',
		pageForm		: 'form-page',
		drawingForm		: 'form-drawing',
		commandInput	: 'input-command',
		turtleInfo		: 'turtle-info',
		appInfoDialog	: 'dialog-appInfo',
	};


	/** @type {array} */
	eventListeners = [
		{
			query: '#button-doCommands',
			type: 'click',
			listener: this.doCommands
		},
		{
			query: '#button-clearDrawing',
			type: 'click',
			listener: pageArea.clearDrawing
		},
		{
			query: '#button-origin',
			type: 'click',
			listener: this.toOrigin
		},
		{
			query: '#form-page',
			type: 'change',
			listener: this.updatePage
		},
		{
			query: '.colourScheme-selector',
			type: 'click',
			listener: (event) => { ui.colourScheme = event.target.dataset.colourscheme; }
		},
		{
			query: '#form-drawing',
			type: 'change',
			listener: pageArea.updateDrawing
		},
		{
			element: document,
			type: 'visibilitychange',
			listener: ()=>turtleApp.visibilitychangeListener
		},
		{
			query: '#command-tabs .tab',
			type: 'click',
			listener: this.commandTabListener
		},
		// {
		// 	query: '#svg-element',
		// 	type: 'dblclick',
		// 	listener: this.svgDblClickListener //()=>console.log('dblclick')//  // not firing sometimes for some reason???
		// },
		{
			query: '#svg-element',
			type: 'click',
			listener: this.svgClickListener
		},
		// {
		// 	query: '#svg-element',
		// 	type: 'keydown',
		// 	listener: this.svgKeyListener
		// },
		{
			element: document,
			type: 'keydown',
			listener: this.documentKeyListener
		},
		{
			query: 'textarea',
			type: 'keydown',
			listener: (event)=>event.stopPropagation()
		},
		{
			query: 'textarea',
			type: 'change',
			listener: ui.updateHiddenInput
		},
		{
			query: '#button-clearPoint',
			type: 'click',
			listener: pageArea.clearPoint,
		},
		{
			query: '#button-showAppInfo',
			type: 'click',
			listener: ui.toggleAppInfoDialog,
		},

	];/* eventListeners */


	//
	//	event listeners
	//

	commandTabListener(event) {
		const newCommandSet = Number.parseInt(event.target.attributes['data-commandSet'].value);
		ui.showCommandSet(newCommandSet);
	}


	/* svgKeyListener(event) {
		//console.log('svgKeyListener', event);
		//event.stopPropagation();
	} */


	keyFunctionMap = {
		'd'	: this.doCommands,
		'c'	: pageArea.clearDrawing,
		'o'	: this.toOrigin,

		'!'	: () => ui.showCommandSet(1),		// ! == shift-1
		'@'	: () => ui.showCommandSet(2),		// @ == shift-2
		'#'	: () => ui.showCommandSet(3),		// # == shift-3

		'T'	: this.toggleTurtle,
		'C'	: this.toggleCenter,
		'R'	: this.toggleRotate,

		'+'	: this.zoomIn,
		'z'	: this.zoomIn,
		'Z'	: this.zoomOut,
		'-'	: this.zoomOut,

		'?'	: ui.toggleAppInfoDialog,
	};


	documentKeyListener(event) {
		//console.log('documentKeyListener', event);

		if (!event.altKey && !event.ctrlKey && !event.metaKey) {

			if (this.keyFunctionMap[event.key]) {
				event.preventDefault();
				this.keyFunctionMap[event.key]();
			}
		}

	}/* documentKeyListener */




	svgClickListener(event) {
		//console.debug('svgClickListener', event);
		const domPoint = new DOMPoint(event.clientX, event.clientY);

		const pageGroup = pageArea.svgElement.getElementById('group-page');

		// Get point in page SVG space
		const pagePoint = domPoint.matrixTransform(pageGroup.getScreenCTM().inverse());
		//console.debug('pagePoint', pagePoint);

		// /this.drawPoint(pagePoint.x, pagePoint.y);	// adding this line seems to cancel subsequent events - do I need to re-propagate the event or something?

		//console.debug('svgClickListener', cmd);

		const mouseMode = ui.mouseMode;

		if (mouseMode === 'info') {
			pageArea.drawPointInfo(pagePoint.x, pagePoint.y);
		}
		else if (mouseMode === 'draw') {
			const cmd = `xyTurn ${pagePoint.x}, ${-pagePoint.y}`;
			this.doCommand(cmd);
		}
		else if (mouseMode === 'move')
		{
			const cmd = `~xyTurn ${pagePoint.x}, ${-pagePoint.y}`;
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

		const cmd = `xyTurn ${pagePoint.x}, ${-pagePoint.y}`;

		//console.debug('svgClickListener', cmd);

		this.doCommand(cmd);

	}/ * svgDblClickListener */






	//
	//	handlers
	//

	updatePage() {
		pageArea.updatePage();
	}

	toOrigin() {
		//console.log('toOrigin');
		//const cmd = new turtleCommand.Command('origin');
		this.doCommand('~origin');
		pageArea.updateTurtle();
		ui.updateTurtleInfo();
	}


	doCommands() {
		const commands = turtleCommand.generateCommands(ui.commandString);
		//console.log('Commands:', commands);

		const commandOutput = turtleApp.turtle.doCommands(commands);
		pageArea.updateTurtle();
		pageArea.draw(commandOutput);
		ui.updateTurtleInfo();
	}/* doCommands */


	doCommand(commandString) {
		const command = turtleCommand.createCommand(commandString);
		//console.log(commands);
		const commandOutput = turtleApp.turtle.doCommand(command);
		pageArea.updateTurtle();
		pageArea.draw(commandOutput);
		ui.updateTurtleInfo();
	}



	toggleTurtle() {
		ui.showTurtle = !ui.showTurtle;
		pageArea.showTurtle = ui.showTurtle;
	}

	toggleCenter() {
		ui.centerTurtle = !ui.centerTurtle;
		pageArea.updatePageTransform();
	}

	toggleRotate() {
		ui.rotatePage = !ui.rotatePage;
		pageArea.updatePageTransform();
	}



	zoomIn() {
		//console.log('zoomIn');
		ui.zoom++;
		pageArea.updatePageTransform();
	}

	zoomOut() {
		//console.log('zoomOut');
		ui.zoom--;
		pageArea.updatePageTransform();
	}


} /* Controller  */


export const controller = new Controller();