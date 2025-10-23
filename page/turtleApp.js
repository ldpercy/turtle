//
//	turtleApp.js
//


class TurtleApp extends HTMLApp {

	info = `
		Turtle by ldpercy
		https://github.com/ldpercy/turtle/
		v0.7-dev
		https://github.com/ldpercy/turtle/pull/5
	`.replace(/\n\t/g,'\n');


	element = {
		commandInput	: 'input-command',
		pageForm		: 'form-page',
		drawingForm		: 'form-drawing',
		svg				: 'svg-element',
		page			: 'group-page',
		gridCartesian	: 'group-gridCartesian',
		gridPolar		: 'group-gridPolar',
		drawing			: 'group-drawing',
		turtleIcon		: 'icon-turtle',
	};

	eventListeners = [
		{
			query: '#input-do',
			type: 'click',
			listener: this.doCommands
		},
		{
			query: '#input-clear',
			type: 'click',
			listener: this.clear
		},
		{
			query: '#input-origin',
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

		this.updateTurtle();
		this.updatePage();
		this.updateDrawing();
		this.updateGrid();
	}/* documentDOMContentLoaded */


	visibilitychangeListener() {
		//console.debug('visibilitychangeListener', arguments);
		//console.debug('document.visibilityState', document.visibilityState);
		if (document.visibilityState === 'hidden')
		{
			this.saveSettings();
		}
	}


	updatePage() {
		if (this.element.pageForm.showTurtle.checked) {
			this.element.turtleIcon.style.display = '';
		}
		else {
			this.element.turtleIcon.style.display = 'none';
		}

		if (this.element.pageForm.showCartesian.checked) {
			this.element.gridCartesian.style.display = '';
		}
		else {
			this.element.gridCartesian.style.display = 'none';
		}
		if (this.element.pageForm.showPolar.checked) {
			this.element.gridPolar.style.display = '';
		}
		else {
			this.element.gridPolar.style.display = 'none';
		}


		if (this.element.pageForm.theme.value === 'light')
		{
			document.body.classList.replace('dark','light') ;
		}
		else {
			document.body.classList.replace('light','dark') ;
		}

		this.element.gridCartesian.style.setProperty('opacity', this.element.pageForm.cartesianOpacity.value);
		this.element.gridPolar.style.setProperty('opacity', this.element.pageForm.polarOpacity.value);

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

		const commandOutput = this.turtle.doCommands(commands);
		this.updateTurtle();
		this.draw(commandOutput);
	}/* doCommands */



	updatePageTransform() {

		const rotate = this.turtle.heading.degrees;

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
			`rotate(${this.turtle.heading.degrees},${this.turtle.svgX},${this.turtle.svgY})`
		);

		this.updatePageTransform();

		document.getElementById('turtle-title').innerHTML = this.turtle.report;
		document.getElementById('turtle-report').innerHTML = this.turtle.report;
	}/* updateTurtle */


	updateGrid() {
		const cartesianGrid = new SVG.CartesianGrid(this.space, this.page);
		this.element.gridCartesian.innerHTML = cartesianGrid.toString();

		const polarGrid = new SVG.PolarGrid(this.space, this.page);
		this.element.gridPolar.innerHTML = polarGrid.toString();
	}


	saveSettings() {
		// could be moved to window before unload??
		// onvisibility state change

		localStorage.setItem('commandStr',this.element.commandInput.value);

		// fp = document.getElementById('form-page');
		// fd = document.getElementById('form-drawing');


		// Note caveats: https://stackoverflow.com/a/55874235

		const appSettings = {
			page : this.getFormData(this.element.pageForm),
			drawing : this.getFormData(this.element.drawingForm),
		};

		const appSettingsJson = JSON.stringify(appSettings);
		localStorage.setItem('appSettings', appSettingsJson );

		const appSettings2 = {
			page : this.getFormData2(this.element.pageForm),
			drawing : this.getFormData2(this.element.drawingForm),
		};
		const appSettingsJson2 = JSON.stringify(appSettings2);
		localStorage.setItem('appSettings2', appSettingsJson2 );


		//console.debug('appSettings', appSettings);

		localStorage.setItem('savedAt', new Date());

		//.log('Settings saved');
	}/* saveSettings */


	loadSettings() {
		if (localStorage.commandStr) {
			this.element.commandInput.value = localStorage.getItem('commandStr');
		}
		//console.log('Settings loaded');

		if (localStorage.appSettings) {

		}

	}


}/* TurtleApp */


turtleApp = new TurtleApp();

