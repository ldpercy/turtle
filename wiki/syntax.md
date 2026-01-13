Syntax
======

> [!WARNING]
> In progress, subject to revision




Syntax version 1
----------------

This is the syntax I began with; it has grown organically, with revisions here and there.

Statements are of the form:
```
	[turtle implied] [~] $command $args
```

### Rules

* Commands are case-sensitive
* Angles are in degrees
* Distances are in SVG units (or "pixels")
* Items in square brackets are optional and can be omitted
* Blank lines are ignored
* Unknown/invalid commands are ignored
* You can comment out a line by turning it into an unknown command, eg `//right 45,500`


### Movement

| syntax						| example			| description										|
| ------						| -------			| -----------										|
| left *angle[,distance]*		| left 30,500		| bear left degrees for the given distance			|
| right *angle[,distance]*		| right 45,500		| bear right degrees for the given distance			|
| bear *angle[,distance]*		| bear 60,200		| bear w.r.t. to the polar direction				|
| move *dx,dy*					| move 400,300		| move in the turtle's local frame					|
| xy *x,y*						| xy 123,456		| move to x,y without changing direction			|
| xyTurn *x,y*					| xyTurn 400,300	| move to x,y and turn to face the new direction	|
| ~*command*					| ~left 30,500		| suppress drawing for any command					|


### SVG drawing commands

These do not move the turtle, but draw items at its current location and orientation.


| syntax					| example			| description										|
| ------					| -------			| -----------										|
| circle *radius*			| circle 100		| draw a circle with the given radius				|
| ellipse *width,height*	| ellipse 150,50	| draw an ellipse with the given width & height		|
| rect *width,height*		| rect 250,100		| draw a rectangle with the given width & height	|
| text *string*				| text Hello 🐢		| draw text with a given string						|
| marker					| marker			| drop a marker flag - hover for position info		|




Syntax version 2
----------------

Some new syntax ideas - not sure yet if they'll be compatible with v1, might need to become a new version.

Statements are of the form:
```
	[turtle implied] $property $operator $args
```

Initially I might smoosh the property and operator together to become single commands.

Properties are either in terms of the space's coordinate system, or in the turtle's local frame.
Space coordinates are lower case as per convention, turtle coordinates are prefixed with 'frame'.

Haven't decided yet if want assignment or addition to be the default operator in this syntax, will try a few things and see what looks best.
I think I might actually make assignment default here...

There's a bit of a syntactical and property name land-grab going on, so things might get shuffled around.
Eg have unresolved questions about whether and when to use 'angle' or 'direction' need to clear this up.


Examples using space coordinates:
```
	x=		100			// turtle.position.cartesian.x	= 100
	x+		200			// turtle.position.cartesian.x	+= 200
	radius= 500			// turtle.position.polar.r		= 500			... set the turtle distance from the **origin**
	radius+ 500			// turtle.position.polar.r		+= 500
	angle=	50			// turtle.position.polar.a		= 50			... rotates the turtle about the **origin**
	angle-	60			// turtle.position.polar.a		-= 60

	xy=		100,200		// turtle.position.cartesian = $args
```

Note that although these look similar, they are different in that the second is an *explicit* subtraction:
```
	x+		-100			// add a negative quantity			...commutative
	x-		100				// subtract a positive quantity		...non-commutative
```


Examples using turtle-local-frame coordinates:
```
	frame.x+	100			// move the turtle to it's right by 100
	frame.x=	100			// the same
	frame.x-	100			// move the turtle to it's left by 100
	frame.x=	-100		// same
	frame.x+	-100		// same

	// Note that 'equals' becomes synonymous with 'plus' in this scheme:

	frame.y+		100		// move forward by 100
	frame.y=		100		// same
	frame.radius=	100		// set the turtle's local polar radius to 100, equivalent to a forward move

	frame.angle+	45		// rotate on the spot 45 degrees

	frame.xy=	100,200		// move to $args in the local frame 	-- this is the current 'move' command

```

