

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

	document.getElementById('group-output').style.stroke = document.getElementById('input-colour').value;
	document.getElementById('group-output').style['stroke-width'] = document.getElementById('input-width').value;


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
	console.log('--- doCommand ---');
	const commandStr = document.getElementById('input-command').value;
	const commands = Turtle.getCommands(commandStr);

	//console.log('Commands:', commands);

	draw(turtle.doCommand(commands));

	updateTurtle();
}


function updateTurtle() {
	turtleIcon.setAttribute('x',turtle.x);
	turtleIcon.setAttribute('y',turtle.y);
	turtleIcon.setAttribute('transform',
		`rotate(${turtle.headingDegrees},${turtle.x},${turtle.y})`
	);

	document.getElementById('turtle-title').innerHTML = turtle.report;
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