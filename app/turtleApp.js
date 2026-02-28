//
//	turtleApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { SVGTurtle } from "../[library]/SVGTurtle.js";

import { SVG } from "../[library]/SVG.js";
import { Space } from "../[library]/PlanarSpace.js";

import * as introduction from './introduction.js';
import * as controller from './controller.js';
import { svg } from './view-svg.js';
import { ui } from './view-html-ui.js';


class TurtleApp extends HTMLApp {

	appVersion = 'v0.📽🖧';
	appInfo = [`%c
		Turtle ${this.appVersion} by ldpercy
		https://github.com/ldpercy/year-clock/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		'color: light-dark(seagreen, lightseagreen); font-weight:bold;'
	];



	/** @type {object} */
	elementMap = {
		commandInput	: 'input-command',
		turtleForm		: 'form-turtle',
		pageForm		: 'form-page',
		drawingForm		: 'form-drawing',
		svg				: 'svg-element',
		page			: 'group-page',
		drawing			: 'group-drawing',
	};

	/** @type {array} */
	eventListeners = [
		{
			query: '#button-doCommands',
			type: 'click',
			listener: controller.doCommands
		},
		{
			query: '#button-clearDrawing',
			type: 'click',
			listener: svg.clearDrawing
		},
		{
			query: '#button-origin',
			type: 'click',
			listener: controller.toOrigin
		},
		{
			query: '#form-page',
			type: 'change',
			listener: controller.updatePage
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
			listener: controller.commandTabListener
		},
		// {
		// 	query: '#svg-element',
		// 	type: 'dblclick',
		// 	listener: this.svgDblClickListener //()=>console.log('dblclick')//  // not firing sometimes for some reason???
		// },
		{
			query: '#svg-element',
			type: 'click',
			listener: controller.svgClickListener
		},
		// {
		// 	query: '#svg-element',
		// 	type: 'keydown',
		// 	listener: controller.svgKeyListener
		// },
		{
			element: document,
			type: 'keydown',
			listener: controller.documentKeyListener
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


		const firstLoad = !localStorage.appSettings;

		this.loadSettings();

		localStorage.setItem('documentDOMContentLoaded', new Date().toISOString());
		sessionStorage.setItem('documentDOMContentLoaded', new Date().toISOString());


		this.setup();

		if (firstLoad) {
			console.log('first load')
			this.element.commandInput.value = introduction.writeTurtleCommandString();
			controller.doCommands();
		}

	}/* documentDOMContentLoaded */



	setup() {

		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');
		this.page = new SVG.Rectangle(-2400, -2400, 4800, 4800);
		//this.page = new SVG.Rectangle(0, 0, 2100, 2970);		// A4 page
		//const pageViewBox = new SVG.Rectangle(0, -2970, 2100, 2970);
		this.viewBox = new SVG.ViewBox(this.page);

		this.element.svg.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new Space('turtle-space');
		this.turtle = new SVGTurtle('Terry', 'turtle-terry', this.space, 6);		// Pratchett & Tao

		svg.placeTurtle(this.turtle);

		svg.updatePage();
		svg.updateTurtle();

		svg.drawGrid();
		svg.updateDrawing();
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

