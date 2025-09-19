

function bodyOnload() {

	turtle = new Turtle();

	//document.getElementById('form-turtle').addEventListener('change', redraw);
	document.getElementById('input-do').addEventListener('click', doInstruction);
	document.getElementById('input-clear').addEventListener('click', clear);
	document.getElementById('input-origin').addEventListener('click', toOrigin);


	document.getElementById('form-style').addEventListener('change', updateStyle);




	output  = document.getElementById('group-output');

	/* drawing = `
		${turtle.toPoint(new Point(100,100))}
		${turtle.report}
		${turtle.toPoint(new Point(-200,300))}
		${turtle.toPoint(new Point(-400,-500))}
		${turtle.report}
		${turtle.toBearing({bearing:90,distance:200})}
		${turtle.report}
		${turtle.toBearing({bearing:90,distance:200})}
		${turtle.toPoint({x:90,y:-200})}
	`;

	draw(drawing); */
}



function updateStyle() {

	//console.log('updateStyle', fillRule);

	if (document.getElementById('input-fillRule').value === 'evenodd') {
		document.getElementById('group-output').classList.add('evenodd');
	}
	else {
		document.getElementById('group-output').classList.remove('evenodd');
	}

	if (document.getElementById('input-showMarkers').checked) {
		document.getElementById('group-output').classList.add('show-markers');
	}
	else {
		document.getElementById('group-output').classList.remove('show-markers');
	}

	if (document.getElementById('input-showGrid').checked) {
		document.getElementById('group-grid').style.display = '';
	}
	else {
		document.getElementById('group-grid').style.display = 'none';
	}

}




function draw(string) {
	output.innerHTML += string;
}

function clear(string) {
	output.innerHTML = '';
}

function toOrigin() {
	turtle.toOrigin();
}

/* function doInstruction() {
	const instructionStr = document.getElementById('input-instruction').value;
	const instructionObj = JSON.parse(instructionStr);
	draw(turtle.do(instructionObj));
} */

function doInstruction() {
	console.log('--- doInstruction ---');
	const instructionStr = document.getElementById('input-instruction').value;
	const commands = Turtle.getCommands(instructionStr);

	//console.log('Commands:', commands);

	draw(turtle.doCommand(commands));
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