
import { turtleApp } from "./turtleApp.js";


export function svgKeyListener(event) {
	//console.log('svgKeyListener', event);
	//event.stopPropagation();
}


export function documentKeyListener(event) {
	//console.log('documentKeyListener', event);


	switch(event.key) {
		case 'd'	: turtleApp.doCommands(); break;
		case 'c'	: turtleApp.clearDrawing(); break;
		case 'o'	: turtleApp.toOrigin(); break;
		//case '+'	: turtleApp.toOrigin(); break;
		//case '-'	: turtleApp.toOrigin(); break;

		default     : /* do nothing */; break;
	}


}/* documentKeyListener */





