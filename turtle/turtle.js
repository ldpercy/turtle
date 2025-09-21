

function bodyOnload() {

	turtle = new Turtle();

	//document.getElementById('form-turtle').addEventListener('change', redraw);
	document.getElementById('input-do').addEventListener('click', doCommand);
	document.getElementById('input-clear').addEventListener('click', clear);
	document.getElementById('input-origin').addEventListener('click', toOrigin);


	document.getElementById('form-style').addEventListener('change', updateStyle);

	output  = document.getElementById('group-output');

	turtleIcon = document.getElementById('icon-turtle');
	updateTurtle();
	updateStyle();
}



function updateStyle() {

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


	if (document.getElementById('input-showMarkers').checked) {
		document.getElementById('group-output').classList.add('show-marker');
	}
	else {
		document.getElementById('group-output').classList.remove('show-marker');
	}

	const drawColour = document.getElementById('input-colour').value;
	document.getElementById('group-output').style.setProperty('--draw-colour', drawColour);

	const strokeWidth = document.getElementById('input-strokeWidth').value;
	document.getElementById('svg-drawing').style.setProperty('--drawing-stroke-width',strokeWidth);

	if (document.getElementById('input-showStroke').checked) {
		document.getElementById('group-output').style.setProperty('--drawing-stroke-width',strokeWidth);
	}
	else {
		document.getElementById('group-output').style.setProperty('--drawing-stroke-width',0);
	}


}/* updateStyle */




function draw(string) {
	output.innerHTML += string;
}

function clear(string) {
	output.innerHTML = '';
}

function toOrigin() {
	turtle.toOrigin();
	updateTurtle();
}


function doCommand() {
	//console.log('--- doCommand ---');
	const commandStr = document.getElementById('input-command').value;
	const commands = Turtle.getCommands(commandStr);

	//console.log('Commands:', commands);

	const commandOutput = turtle.doCommand(commands);
	updateTurtle();
	draw(commandOutput);
}


function updateTurtle() {
	turtleIcon.setAttribute('x', turtle.position.x);
	turtleIcon.setAttribute('y', turtle.position.y);
	turtleIcon.setAttribute('transform',
		`rotate(${turtle.heading.degrees},${turtle.position.x},${turtle.position.y})`
	);

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