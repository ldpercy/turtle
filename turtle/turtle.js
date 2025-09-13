

function bodyOnload() {

	//document.getElementById('form-turtle').addEventListener('change', redraw);
	document.getElementById('input-do').addEventListener('click', doInstruction);
	document.getElementById('form-style').addEventListener('change', updateStyle);


	turtle = new Turtle();

	output  = document.getElementById('group-output');

	drawing = `
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

	draw(drawing);
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

function doInstruction() {
	const instructionStr = document.getElementById('input-instruction').value;
	const instructionObj = JSON.parse(instructionStr);
	draw(turtle.do(instructionObj));
}

/*
{"i":"p","p":{"x":500,"y":500}}
*/