//
//	turtleApp.js
//


class TurtleApp extends HTMLApp {

	info = `
		Turtle by ldpercy
		https://github.com/ldpercy/turtle/
		Version 0.5
		https://github.com/ldpercy/turtle/pull/4
	`;


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

		this.page = new PlanarSpace('page');
		this.turtle = new SVGTurtle('Terry', this.page, 6);

		this.svgElement = document.getElementById('svg-element');
		//this.viewBox = new SVG.viewBox().fromString('-1200 -1200 2400 2400');
		this.drawing  = document.getElementById('group-drawing');
		this.turtleIcon = document.getElementById('icon-turtle');

		this.updateTurtle();
		this.updatePage();
		this.updateDrawing();
	}/* documentDOMContentLoaded */



	updatePage() {
		const pageForm = document.getElementById('form-page');
		if (pageForm.showTurtle.checked) {
			document.getElementById('icon-turtle').style.display = '';
		}
		else {
			document.getElementById('icon-turtle').style.display = 'none';
		}

		if (pageForm.showGrid.checked) {
			document.getElementById('group-grid').style.display = '';
		}
		else {
			document.getElementById('group-grid').style.display = 'none';
		}

		if (pageForm.theme.value === 'light')
		{
			document.body.classList.replace('dark','light') ;
		}
		else {
			document.body.classList.replace('light','dark') ;
		}

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
		document.getElementById('group-drawing').style.setProperty('--drawing-stroke-width',strokeWidth);

		if (document.getElementById('input-showMarkers').checked) {
			document.getElementById('group-drawing').classList.add('show-marker');
		}
		else {
			document.getElementById('group-drawing').classList.remove('show-marker');
		}

		if (document.getElementById('input-showStroke').checked) {
			document.getElementById('group-drawing').style.setProperty('--drawing-stroke-width',strokeWidth);
		}
		else {
			document.getElementById('group-drawing').style.setProperty('--drawing-stroke-width',0);
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



}/* TurtleApp */


turtleApp = new TurtleApp();

