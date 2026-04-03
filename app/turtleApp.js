//
//	turtleApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { SVGTurtle } from "./SVGTurtle.js";

import * as svg from "../[html-common]/module/SVG.js";
import { Space } from "../[html-common]/module/PlanarSpace.js";

import * as introduction from './introduction.js';
import { controller} from './controller.js';
import { pageArea } from './page-area.js';
import { ui } from './html-ui.js';


class TurtleApp extends HTMLApp {

	appName			= 'turtle';
	appVersion		= 'v0.12.3';
	projectColour	= 'lightseagreen';
	appInfo = [`%c
		Turtle ${this.appVersion} by ldpercy
		https://github.com/ldpercy/year-clock/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
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






	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();

		const firstLoad = !localStorage[`${this.appName}_documentDOMContentLoaded`];

		ui.colourScheme = localStorage[`${this.appName}_colourScheme`] || 'light';

		this.loadSettings();

		localStorage.setItem(`${this.appName}_documentDOMContentLoaded`, new Date().toISOString());
		sessionStorage.setItem(`${this.appName}_documentDOMContentLoaded`, new Date().toISOString());

		this.setup();

		if (firstLoad) {
			console.log('first load')
			this.element.commandInput.value = introduction.writeTurtleCommandString();
			controller.doCommands();
		}

	}/* documentDOMContentLoaded */



	setup() {

		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');

		this.page = new svg.Box(-2400, -2400, 4800, 4800);
		//this.page = new SVG.Rectangle(0, 0, 2100, 2970);		// A4 page
		//const pageViewBox = new SVG.Rectangle(0, -2970, 2100, 2970);
		this.viewBox = new svg.ViewBox(this.page.x, this.page.y, this.page.width, this.page.height);

		this.element.svg.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new Space(undefined,'turtle-space');
		this.turtle = new SVGTurtle('Terry', 'turtle-terry', this.space, 6);		// Pratchett & Tao

		pageArea.placeTurtle(this.turtle);

		pageArea.updatePage();
		pageArea.updateTurtle();

		pageArea.drawGrid();
		pageArea.updateDrawing();
		ui.updateTurtleInfo();
	}



	// controller methods









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
		localStorage.setItem(`${this.appName}_settings`, appSettingsJson );
		localStorage.setItem(`${this.appName}_savedAt`, new Date().toISOString());
		//.log('Settings saved');
	}/* saveSettings */


	loadSettings() {
		//console.log('Settings loaded');

		if (localStorage[`${this.appName}_settings`]) {

			const appSettings = JSON.parse(localStorage[`${this.appName}_settings`]);
			this.populateForm(this.element.turtleForm, appSettings.turtle);
			this.populateForm(this.element.pageForm, appSettings.page);
			this.populateForm(this.element.drawingForm, appSettings.drawing);
		}
		else {
			// first load
		}

		localStorage.setItem(`${this.appName}_loadedAt`, new Date().toISOString());
	}/* loadSettings */




}/* TurtleApp */




export const turtleApp = new TurtleApp();

