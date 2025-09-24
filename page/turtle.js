

function bodyOnload() {

	turtle = new Turtle();

	//document.getElementById('form-turtle').addEventListener('change', redraw);
	document.getElementById('input-do').addEventListener('click', doCommands);
	document.getElementById('input-clear').addEventListener('click', clear);
	document.getElementById('input-origin').addEventListener('click', toOrigin);


	document.getElementById('form-style').addEventListener('change', updateStyle);

	drawing  = document.getElementById('group-drawing');

	turtleIcon = document.getElementById('icon-turtle');
	updateTurtle();
	updateStyle();
}



function updateStyle() {


	// Page
	if (document.getElementById('input-showTurtle').checked) {
		document.getElementById('icon-turtle').style.display = '';
	}
	else {
		document.getElementById('icon-turtle').style.display = 'none';
	}

	if (document.getElementById('input-showGrid').checked) {
		document.getElementById('group-grid').style.display = '';
	}
	else {
		document.getElementById('group-grid').style.display = 'none';
	}

	updatePageTransform();

	/* if (document.getElementById('input-pageRotate').checked) {
		document.getElementById('group-page').setAttribute('transform', getPageRotation());
	}
	else {
		document.getElementById('group-page').setAttribute('transform','');
	}

	if (document.getElementById('input-centerTurtle').checked) {
		document.getElementById('group-page').setAttribute('transform', getPageRotation());
	}
	else {
		document.getElementById('group-page').setAttribute('transform','');
	} */

	// Drawing
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


}/* updateStyle */




function draw(string) {
	drawing.innerHTML += string;
}

function clear(string) {
	drawing.innerHTML = '';
}

function toOrigin() {
	turtle.toOrigin();
	updateTurtle();
}


function doCommands() {
	//console.log('--- doCommand ---');
	const commandStr = document.getElementById('input-command').value;
	const commands = Turtle.getCommands(commandStr);

	//console.log('Commands:', commands);

	const commandOutput = turtle.doCommands(commands);

	updateTurtle();
	draw(commandOutput);
}


function getPageRotation() {
	const rotate = degrees180(turtle.heading.degrees);
	//const result = `rotate(${-rotate},${turtle.x},${turtle.y})`;
	const result = `rotate(${-rotate},0,0)`;
	return result;
}


function updatePageTransform() {

	//const rotate = degrees180(turtle.heading.degrees);

	const rotate = turtle.heading.degrees;

	// const turtleTurn = turtle.heading.degrees - turtle.headingPrevious.degrees;

	//console.log(rotate);


	const rotateTransform    = (document.getElementById('input-rotatePage').checked)   ? `rotate(${-rotate},0,0)` : '';
	const translateTransform = (document.getElementById('input-centerTurtle').checked) ? `translate(${-turtle.x},${-turtle.y})` : '';

	const transform = `${rotateTransform} ${translateTransform}`;

	document.getElementById('group-page').setAttribute('transform', transform);
}



function updateTurtle() {
	turtleIcon.setAttribute('x', turtle.x);
	turtleIcon.setAttribute('y', turtle.y);
	turtleIcon.setAttribute('transform',
		`rotate(${turtle.heading.degrees},${turtle.x},${turtle.y})`
	);

	updatePageTransform();

	document.getElementById('turtle-title').innerHTML = turtle.report;
	document.getElementById('turtle-report').innerHTML = turtle.report;
}

/*
m 1
b 2
c 1,2
d
e 1,2,3,4



{"i":"p","p":{"x":500,"y":500}}

{"i":"b","p":{"bearing":345,"distance":345}}

*/




function degrees180(degrees) {
	// https://stackoverflow.com/questions/2320986/easy-way-to-keeping-angles-between-179-and-180-degrees
	// my brain is mushy

	// reduce the angle
	let result = degrees % 360;

	// force it to be the positive remainder, so that 0 <= angle < 360
	result = (result + 360) % 360;

	// force into the minimum absolute value residue class, so that -180 < angle <= 180
	if (result > 180)
		result -= 360;
	return result;
}/* degrees180 */