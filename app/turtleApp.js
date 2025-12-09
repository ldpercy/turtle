//
//	turtleApp.js
//

import { HTMLApp } from "../[library]/HTMLApp.js";
import { SVGTurtle } from "../[library]/SVGTurtle.js";
import { Turtle } from "../[library]/Turtle.js";
import { SVG } from "../[library]/SVG.js";
import { PlanarSpace } from "../[library]/PlanarSpace.js";

import * as introduction from './introduction.js';
import * as keyboard from './keyboard.js';
import * as svg from './svg.js';
import * as ui from './html-ui.js';


class TurtleApp extends HTMLApp {

	info = `
		Turtle v0.🖮🎛 by ldpercy
		https://github.com/ldpercy/turtle/pull/??
	`.replace(/\n\t\t/g,'\n');


	elementMap = {
		commandInput	: 'input-command',
		turtleForm		: 'form-turtle',
		pageForm		: 'form-page',
		drawingForm		: 'form-drawing',
		svg				: 'svg-element',
		page			: 'group-page',
		drawing			: 'group-drawing',
	};

	eventListeners = [
		{
			query: '#button-doCommands',
			type: 'click',
			listener: this.doCommands
		},
		{
			query: '#button-clearDrawing',
			type: 'click',
			listener: svg.clearDrawing
		},
		{
			query: '#button-origin',
			type: 'click',
			listener: this.toOrigin
		},
		{
			query: '#form-page',
			type: 'change',
			listener: svg.updatePage
		},
		{
			query: '#form-drawing',
			type: 'change',
			listener: svg.updateDrawing
		},
		{
			element: document,
			type: 'visibilitychange',
			listener: this.visibilitychangeListener
		},
		{
			query: '#command-tabs .tab',
			type: 'click',
			listener: ui.tabListener
		},
		/* {
			query: '#svg-element',
			type: 'dblclick',
			listener: this.svgDblClickListener //()=>console.log('dblclick')//  // not firing sometimes for some reason???
		}, */
		{
			query: '#svg-element',
			type: 'click',
			listener: svg.clickListener
		},
		{
			query: '#svg-element',
			type: 'keydown',
			listener: keyboard.svgKeyListener
		},
		{
			element: document,
			type: 'keydown',
			listener: keyboard.documentKeyListener
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
			listener: svg.clearPoint,
		},

	];




	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();


		this.page = new SVG.Rectangle(-2400, -2400, 4800, 4800);
		//this.page = new SVG.Rectangle(0, 0, 2100, 2970);		// A4 page
		//const pageViewBox = new SVG.Rectangle(0, -2970, 2100, 2970);
		this.viewBox = new SVG.ViewBox(this.page);

		this.element.svg.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new PlanarSpace('turtle-space');
		this.turtle = new SVGTurtle('Terry', this.space, 6);		// Pratchett & Tao


		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');

		const firstLoad = !localStorage.appSettings;

		this.loadSettings();

		ui.init();
		svg.init();


		svg.updatePage();
		svg.updateTurtle();

		svg.drawGrid();
		svg.updateDrawing();
		ui.updateTurtleInfo();

		localStorage.setItem('documentDOMContentLoaded', new Date().toISOString());
		sessionStorage.setItem('documentDOMContentLoaded', new Date().toISOString());

		if (firstLoad) {
			console.log('first load')
			this.element.commandInput.value = introduction.writeTurtleCommandString();
			this.doCommands();
		}
	}/* documentDOMContentLoaded */



	toOrigin() {
		//turtle.toOrigin();
		this.turtle.doCommand({name:'o'});
		svg.updateTurtle();
		ui.updateTurtleInfo();
	}


	doCommands() {
		const commands = Turtle.getCommands(this.element.commandInput.value);
		//console.log('Commands:', commands);

		const commandOutput = this.turtle.doCommands(commands);
		svg.updateTurtle();
		svg.draw(commandOutput);
		ui.updateTurtleInfo();
	}/* doCommands */


	doCommand(cmdString) {
		const commands = Turtle.getCommands(cmdString);
		//console.log(commands);
		const commandOutput = this.turtle.doCommands(commands);
		svg.updateTurtle();
		svg.draw(commandOutput);
		ui.updateTurtleInfo();
	}




	//
	// application lifecycle
	//


	visibilitychangeListener() {
		//console.debug('visibilitychangeListener', arguments);
		//console.debug('document.visibilityState', document.visibilityState);
		if (document.visibilityState === 'hidden')
		{
			this.saveSettings();
		}
	}



	/* saveSettings
	*/
	saveSettings() {

		// Note caveats: https://stackoverflow.com/a/55874235

		const appSettings = {
			turtle	: this.getFormData(this.element.turtleForm),
			page	: this.getFormData(this.element.pageForm),
			drawing	: this.getFormData(this.element.drawingForm),
		};

		//console.log(appSettings);

		const appSettingsJson = JSON.stringify(appSettings);
		localStorage.setItem('appSettings', appSettingsJson );
		localStorage.setItem('savedAt', new Date().toISOString());
		//.log('Settings saved');
	}/* saveSettings */


	loadSettings() {
		//console.log('Settings loaded');
		if (localStorage.appSettings) {

			const appSettings = JSON.parse(localStorage.appSettings);
			this.populateForm(this.element.turtleForm, appSettings.turtle);
			this.populateForm(this.element.pageForm, appSettings.page);
			this.populateForm(this.element.drawingForm, appSettings.drawing);
		}
		else {
			// first load

		}
		localStorage.setItem('loadedAt', new Date().toISOString());
	}/* loadSettings */




}/* TurtleApp */




export const turtleApp = new TurtleApp();

