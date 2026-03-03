//
//	introduction
//


import { turtleApp } from './turtleApp.js';


export function writeTurtleCommandString() {
	// intro for initial load
	const result = `
		// Welcome to Turtle
		~right 55,550
		left 55
		text ${turtleApp.appVersion}
		~right 55,-550
		left 55

		//T
		~xy -492,418
		left 190
		rect 350,20
		~right 0,200
		ellipse 20,400
		~right 0,200
		marker

		//u
		~left 160,220
		right 165,200
		left 55,100
		left 55,70
		left 69,190

		~right 90,70
		right 92,200
		left 183,183
		right 88,113

		~left 131,81
		right 134,174

		~left 137,111
		left 127,313
		left 49,49

		~left 54,90
		left 81,400

		~right 171,331
		left 79,142
		left 119,99
		left 62,79
		left 68,94
		left 58,94
		left 44,74
		left 49,19
	`.trim().replace(/\n\t+/g,'\n');
	return result;
}
