//
//	introduction
//




export function writeTurtleCommandString() {
	// intro for initial load
	const result = `
		// Turtle
		^left 60,800
		right 140,400
		right 175,200
		left 85,400
		marker

		^left 160,220
		right 165,200
		left 55,100
		left 55,70
		left 69,190

		^right 90,70
		right 92,200
		left 183,183
		right 88,113

		^left 131,81
		right 134,174

		^left 137,111
		left 127,313
		left 49,49

		^left 54,90
		left 81,400

		^right 171,331
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
