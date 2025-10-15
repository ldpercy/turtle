//
//	turtleApp.js
//


class TurtleApp extends HTMLApp {

	info = `
		Turtle by ldpercy
		https://github.com/ldpercy/turtle/
		v0.6a
		https://github.com/ldpercy/turtle/pull/5
	`.replace(/\n\t/g,'\n');


	eventListeners = [
		{
			query: '#input-do',
			type: 'click',
			listener: ()=>this.doCommands
		},
		{
			query: '#input-clear',
			type: 'click',
			listener: ()=>this.clear
		},
		{
			query: '#input-origin',
			type: 'click',
			listener: ()=>this.toOrigin
		},
		{
			query: '#form-page',
			type: 'change',
			listener: ()=>this.updatePage
		},
		{
			query: '#form-drawing',
			type: 'change',
			listener: ()=>this.updateDrawing
		},
	];



	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();

		this.page = new SVG.Rectangle(-2400, -2400, 4800, 4800);
		//this.page = new SVG.Rectangle(0, 0, 2100, 2970);		// A4 page
		this.viewBox = new SVG.ViewBox(this.page);

		// TODO: viewBox is now set to the page, but it's now zoomed out compared to before - see if can zoom in or change default zoom levels

		this.svgElement = document.getElementById('svg-element');
		this.svgElement.setAttribute('viewBox', this.viewBox.toStringPadded(100));

		this.space = new PlanarSpace('turtle-space');
		this.turtle = new SVGTurtle('Terry', this.space, 6);


		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');
		this.gridCartesian = document.getElementById('group-gridCartesian');
		this.gridPolar     = document.getElementById('group-gridPolar');
		this.drawing    = document.getElementById('group-drawing');
		this.turtleIcon = document.getElementById('icon-turtle');

		this.updateTurtle();
		this.updatePage();
		this.updateDrawing();
		this.updateGrid();
	}/* documentDOMContentLoaded */



	updatePage() {
		const pageForm = document.getElementById('form-page');
		if (pageForm.showTurtle.checked) {
			document.getElementById('icon-turtle').style.display = '';
		}
		else {
			document.getElementById('icon-turtle').style.display = 'none';
		}

		if (pageForm.showCartesian.checked) {
			document.getElementById('group-gridCartesian').style.display = '';
		}
		else {
			document.getElementById('group-gridCartesian').style.display = 'none';
		}
		if (pageForm.showPolar.checked) {
			document.getElementById('group-gridPolar').style.display = '';
		}
		else {
			document.getElementById('group-gridPolar').style.display = 'none';
		}


		if (pageForm.theme.value === 'light')
		{
			document.body.classList.replace('dark','light') ;
		}
		else {
			document.body.classList.replace('light','dark') ;
		}

		const cartesianOpacity = document.getElementById('input-cartesianOpacity').value;
		document.getElementById('group-gridCartesian').style.setProperty('opacity', cartesianOpacity);
		const polarOpacity = document.getElementById('input-polarOpacity').value;
		document.getElementById('group-gridPolar').style.setProperty('opacity', polarOpacity);

		this.updatePageTransform();
	}/* updatePage */



	getScale() {

		const zoomPower = Number.parseInt(document.getElementById('input-zoom').value);

		const scale = 2 ** zoomPower;

		//console.log(scale);

		//const newViewBox = viewBox.toStringScale(scale);
		//console.log(newViewBox);
		//svgElement.setAttribute('viewBox',newViewBox);
		return scale;
	}


	updateDrawing() {

		const drawColour = document.getElementById('input-colour').value;
		document.getElementById('group-drawing').style.setProperty('--draw-colour', drawColour);

		const strokeWidth = document.getElementById('input-strokeWidth').value;
		document.getElementById('group-drawing').style.setProperty('--drawing-stroke-width', strokeWidth);

		if (document.getElementById('input-showMarkers').checked) {
			document.getElementById('group-drawing').classList.add('show-marker');
		}
		else {
			document.getElementById('group-drawing').classList.remove('show-marker');
		}

		if (document.getElementById('input-showStroke').checked) {
			document.getElementById('group-drawing').style.setProperty('--drawing-stroke-width', strokeWidth);
		}
		else {
			document.getElementById('group-drawing').style.setProperty('--drawing-stroke-width', 0);
		}

	}/* updateDrawing */




	draw(string) {
		this.drawing.innerHTML += string;
	}

	clear() {
		this.drawing.innerHTML = '';
	}

	toOrigin() {
		//turtle.toOrigin();
		this.turtle.doCommand({name:'o'});
		this.updateTurtle();
	}


	doCommands() {
		//console.log('--- doCommand ---');
		const commandStr = document.getElementById('input-command').value;
		const commands = Turtle.getCommands(commandStr);

		//console.log('Commands:', commands);

		const commandOutput = this.turtle.doCommands(commands);

		this.updateTurtle();
		this.draw(commandOutput);
	}/* doCommands */



	updatePageTransform() {

		const rotate = this.turtle.heading.degrees;

		const rotateTransform    = (document.getElementById('input-rotatePage').checked)   ? `rotate(${-rotate},0,0)` : '';
		const translateTransform = (document.getElementById('input-centerTurtle').checked) ? `translate(${-this.turtle.svgX},${-this.turtle.svgY})` : '';

		const scaleTransform = `scale(${this.getScale()})`;

		const transform = `${scaleTransform} ${rotateTransform} ${translateTransform} `;

		document.getElementById('group-page').setAttribute('transform', transform);
	}/* updatePageTransform */



	updateTurtle() {
		this.turtleIcon.setAttribute('x', this.turtle.svgX);
		this.turtleIcon.setAttribute('y', this.turtle.svgY);
		this.turtleIcon.setAttribute('transform',
			`rotate(${this.turtle.heading.degrees},${this.turtle.svgX},${this.turtle.svgY})`
		);

		this.updatePageTransform();

		document.getElementById('turtle-title').innerHTML = this.turtle.report;
		document.getElementById('turtle-report').innerHTML = this.turtle.report;
	}/* updateTurtle */


	updateGrid() {
		const cartesianGrid = new SVG.CartesianGrid(this.space, this.page);
		this.gridCartesian.innerHTML = cartesianGrid.toString();

		const polarGrid = new SVG.PolarGrid(this.space, this.page);
		this.gridPolar.innerHTML = polarGrid.toString();
	}



}/* TurtleApp */


turtleApp = new TurtleApp();

