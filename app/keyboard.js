
import { turtleApp } from "./turtleApp.js";
import * as svg from "./svg.js";


export function svgKeyListener(event) {
	//console.log('svgKeyListener', event);
	//event.stopPropagation();
}


export function documentKeyListener(event) {
	//console.log('documentKeyListener', event);


	switch(event.key) {
		case 'd'	: turtleApp.doCommands(); break;
		case 'c'	: svg.clearDrawing(); break;
		case 'o'	: turtleApp.toOrigin(); break;

		case '!'	: ui.showCommandSet(1); break;
		case '@'	: ui.showCommandSet(2); break;
		case '#'	: ui.showCommandSet(3); break;

		//case 'C'	: ui.showCommandSet(3); break;
		//case '+'	: ui.zoomIn(); break;
		//case '-'	: ui.zoomOut(); break;

		default     : /* do nothing */; break;
	}


}/* documentKeyListener */





