

function bodyOnload() {

	document.getElementById('form-turtle').addEventListener('change', redraw);
	document.getElementById('form-style').addEventListener('change', updateStyle);

	redraw();
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




function redraw() {

}