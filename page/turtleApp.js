//
//	turtleApp.js
//


class TurtleApp extends HTMLApp {

	info = `
		Turtle v0.8 by ldpercy
		https://github.com/ldpercy/turtle/pull/8
	`.replace(/\n\t/g,'\n');


	currentCommandSet = 1;

	element = {
		commandInput	: 'input-command',
		turtleForm		: 'form-turtle',
		pageForm		: 'form-page',
		drawingForm		: 'form-drawing',
		svg				: 'svg-element',
		page			: 'group-page',
		cartesianGroup  : 'group-cartesian',
		cartesianGrid	: 'group-cartesianGrid',
		polarGroup 		: 'group-polar',
		polarGrid 		: 'group-polarGrid',
		drawing			: 'group-drawing',
		turtleIcon		: 'icon-turtle',
	};

	eventListeners = [
		{
			query: '#button-do',
			type: 'click',
			listener: this.doCommands
		},
		{
			query: '#button-clear',
			type: 'click',
			listener: this.clear
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
			query: '#form-drawing',
			type: 'change',
			listener: this.updateDrawing
		},
		{
			element: document,
			type: 'visibilitychange',
			listener: this.visibilitychangeListener
		},
		{
			query: '#command-tabs .tab',
			type: 'click',
			listener: this.tabListener
		},
		/* {
			query: '#svg-element',
			type: 'dblclick',
			listener: this.svgDblClickListener //()=>console.log('dblclick')//  // not firing sometimes for some reason???
		}, */
		{
			query: '#svg-element',
			type: 'click',
			listener: this.svgClickListener
		},
		{
			query: '#button-clearPoint',
			type: 'click',
			listener: this.clearPoint,
		},

	];




	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();

		this.page = new SVG.Rectangle(-2400, -2400, 4800, 4800);
		//this.page = new SVG.Rectangle(0, 0, 2100, 2970);		// A4 page
		//const pageViewBox = new SVG.Rectangle(0, -2970, 2100, 2970);
		this.viewBox = new SVG.ViewBox(this.page);

		// TODO: viewBox is now set to the page, but it's now zoomed out compared to before - see if can zoom in or change default zoom levels


		this.element.svg.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new PlanarSpace('turtle-space');
		this.turtle = new SVGTurtle('Terry', this.space, 6);


		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');

		this.loadSettings();

		const commandSet = Number.parseInt(document.getElementById(`input-commandSet-active`).value) || 1;
		this.showCommandSet((commandSet), false);
		this.updatePage();
		this.updateTurtle();

		this.updateDrawing();
		this.drawGrid();

		localStorage.setItem('documentDOMContentLoaded', new Date().toISOString());
		sessionStorage.setItem('documentDOMContentLoaded', new Date().toISOString());
	}/* documentDOMContentLoaded */


	visibilitychangeListener() {
		//console.debug('visibilitychangeListener', arguments);
		//console.debug('document.visibilityState', document.visibilityState);
		if (document.visibilityState === 'hidden')
		{
			this.saveSettings();
		}
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
			document.getElementById(`input-commandSet-${this.currentCommandSet}`).value = this.element.commandInput.value;
			document.getElementById(`tab-commandSet-${this.currentCommandSet}`).classList.remove('active');
			document.getElementById(`tab-commandSet-${this.currentCommandSet}`).title = this.element.commandInput.value;
		}

		// copy new tab's command set into the texarea
		this.currentCommandSet = commandSet;
		document.getElementById(`input-commandSet-active`).value = commandSet;

		this.element.commandInput.value = document.getElementById(`input-commandSet-${commandSet}`).value;
		document.getElementById(`tab-commandSet-${this.currentCommandSet}`).classList.add('active');
	}



	updatePage() {
		if (this.element.pageForm.showTurtle.checked) {
			this.element.turtleIcon.style.display = '';
		}
		else {
			this.element.turtleIcon.style.display = 'none';
		}

		if (this.element.pageForm.showCartesian.checked) {
			this.element.cartesianGroup.style.display = '';
		}
		else {
			this.element.cartesianGroup.style.display = 'none';
		}

		if (this.element.pageForm.showPolar.checked) {
			this.element.polarGroup.style.display = '';
		}
		else {
			this.element.polarGroup.style.display = 'none';
		}

		if (this.element.pageForm.theme.value === 'light')
		{
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		}
		else {
			document.body.classList.remove('light');
			document.body.classList.add('dark');
		}

		this.element.cartesianGrid.style.setProperty('opacity', this.element.pageForm.cartesianOpacity.value);
		this.element.polarGrid.style.setProperty('opacity', this.element.pageForm.polarOpacity.value);

		this.updatePageTransform();
	}/* updatePage */



	getScale() {

		const zoomPower = Number.parseInt(this.element.pageForm.zoom.value);

		const scale = 2 ** zoomPower;

		//console.log(scale);

		//const newViewBox = viewBox.toStringScale(scale);
		//console.log(newViewBox);
		//svgElement.setAttribute('viewBox',newViewBox);
		return scale;
	}


	updateDrawing() {

		const drawColour = this.element.drawingForm.colour.value;
		this.element.drawing.style.setProperty('--draw-colour', drawColour);

		const strokeWidth = this.element.drawingForm.strokeWidth.value;
		this.element.drawing.style.setProperty('--drawing-stroke-width', strokeWidth);

		if (this.element.drawingForm.showMarkers.checked) {
			this.element.drawing.classList.add('show-marker');
		}
		else {
			this.element.drawing.classList.remove('show-marker');
		}

		if (this.element.drawingForm.showStroke.checked) {
			this.element.drawing.style.setProperty('--drawing-stroke-width', strokeWidth);
		}
		else {
			this.element.drawing.style.setProperty('--drawing-stroke-width', 0);
		}

	}/* updateDrawing */




	draw(string) {
		this.element.drawing.innerHTML += string;
	}

	clear() {
		this.element.drawing.innerHTML = '';
	}

	toOrigin() {
		//turtle.toOrigin();
		this.turtle.doCommand({name:'o'});
		this.updateTurtle();
	}


	doCommands() {
		const commands = Turtle.getCommands(this.element.commandInput.value);
		//console.log('Commands:', commands);

		// update the hidden command input - this is a hack, the current textarea value need to be saved properly onchange
		document.getElementById(`input-commandSet-${this.currentCommandSet}`).value = this.element.commandInput.value;

		const commandOutput = this.turtle.doCommands(commands);
		this.updateTurtle();
		this.draw(commandOutput);
	}/* doCommands */


	doCommand(cmdString) {
		const commands = Turtle.getCommands(cmdString);
		//console.log(commands);
		const commandOutput = this.turtle.doCommands(commands);
		this.updateTurtle();
		this.draw(commandOutput);
	}


	updatePageTransform() {

		//console.log(this.turtle);

		const rotate = this.turtle.position.degrees;

		const rotateTransform    = (this.element.pageForm.rotatePage.checked)   ? `rotate(${-rotate},0,0)` : '';
		const translateTransform = (this.element.pageForm.centerTurtle.checked) ? `translate(${-this.turtle.svgX},${-this.turtle.svgY})` : '';

		const scaleTransform = `scale(${this.getScale()})`;

		// TODO: see if this can be applied as separate attributes, or combined into a single transform matrix

		const transform = `${scaleTransform} ${rotateTransform} ${translateTransform} `;

		this.element.page.setAttribute('transform', transform);
	}/* updatePageTransform */



	updateTurtle() {
		this.element.turtleIcon.setAttribute('x', this.turtle.svgX);
		this.element.turtleIcon.setAttribute('y', this.turtle.svgY);
		this.element.turtleIcon.setAttribute('transform',
			`rotate(${this.turtle.position.degrees},${this.turtle.svgX},${this.turtle.svgY})`
		);

		this.updatePageTransform();

		document.getElementById('turtle-title').innerHTML = this.turtle.report;
		document.getElementById('turtle-report').innerHTML = this.turtle.report;
	}/* updateTurtle */


	drawGrid() {
		const cartesianGrid = new SVG.CartesianGrid(this.space, this.page);
		document.getElementById('group-cartesianGrid').innerHTML = cartesianGrid.toString();

		const polarGrid = new SVG.PolarGrid(this.space, this.page);
		document.getElementById('group-polarGrid').innerHTML = polarGrid.toString();
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
		localStorage.setItem('loadedAt', new Date().toISOString());
	}/* loadSettings */




	svgClickListener(event) {
		//console.debug('svgClickListener', event);
		const domPoint = new DOMPoint(event.clientX, event.clientY);
		const pageElement = document.getElementById('group-page');

		// Get point in page SVG space
		const pagePoint = domPoint.matrixTransform(pageElement.getScreenCTM().inverse());
		//console.debug('pagePoint', pagePoint);

		// /this.drawPoint(pagePoint.x, pagePoint.y);	// adding this line seems to cancel subsequent events - do I need to re-propagate the event or something?

		//const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;
		//console.debug('svgClickListener', cmd);
		//this.doCommand(cmd);


		if (this.element.pageForm['mouse-click'].value === 'info') {
			this.drawPointInfo(pagePoint.x, pagePoint.y);
		}
		else if (this.element.pageForm['mouse-click'].value === 'draw') {
			const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;
			this.doCommand(cmd);
		}
		else if (this.element.pageForm['mouse-click'].value === 'move')
		{
			const cmd = `^xyr ${pagePoint.x}, ${-pagePoint.y}`;
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

		const cmd = `xyr ${pagePoint.x}, ${-pagePoint.y}`;

		//console.debug('svgClickListener', cmd);

		this.doCommand(cmd);

	}/ * svgDblClickListener */




	drawPointInfo(svgX, svgY) {
		const pointInfoSvg = this.turtle.pointInfo(svgX, -svgY);

		document.getElementById('group-cartesianPoint').innerHTML = pointInfoSvg.cartesian;
		document.getElementById('group-polarPoint').innerHTML = pointInfoSvg.polar;
	}

	clearPoint() {
		document.getElementById('group-cartesianPoint').innerHTML = '';
		document.getElementById('group-polarPoint').innerHTML = '';
	}


}/* TurtleApp */






turtleApp = new TurtleApp();

