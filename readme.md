Turtle
======

A simple implementation of Turtle graphics using SVG and JavaScript.

* https://en.wikipedia.org/wiki/Turtle_graphics


I ended up so close to doing this while working out some polar maths for the [year clock](<https://github.com/ldpercy/year-clock>) that I thought I might as well have a crack at it, a version of it at least.
I'm inventing my own syntax, but it is inspired by the original.

The turtle is named Terry (after Terry Pratchett and Terence Tao).

> [!TIP]
> Live on github pages: [ldpercy.github.io/turtle/](https://ldpercy.github.io/turtle/)


Command Syntax
--------------

* All angles are in degrees
* All distances are in SVG units (or 'pixels')
* Items in square brackets are optional and can be omitted


### Movement Commands

| command						| example		| description							|
|-------------------------------|---------------|---------------------------------------|
| left *angle[,distance]*		| left 30,500	| bear left for the given distance		|
| right *angle[,distance]*		| right 45,500	| bear right for the given distance		|
| bear *angle[,distance]*		| bear 60,200	| bear w.r.t. to the polar direction	|
| jump *angle[,distance]*		| jump 90,400	| bear without drawing a line			|
| move *dx,dy*					| move 400,300	| move in the turtle's local frame		|


NB: 'jump' and 'move' are likely to change soon


### SVG drawing commands

These do not move the turtle, but draw items at its current location and orientation.


| command					| example			| description										|
|---------------------------|-------------------|---------------------------------------------------|
| circle *radius*			| circle 100		| draw a circle with the given radius				|
| ellipse *width,height*	| ellipse 150,50	| draw an ellipse with the given width & height		|
| rect *width,height*		| rect 250,100		| draw a rectangle with the given width & height	|
| text *string*				| text Hello 🐢		| draw text with a given string						|
| marker					| marker			| drop a marker flag - hover for position info		|


### Note

* Blank lines are ignored
* Unknown commands are ignored
* You can comment out a line by turning it into an unknown command, eg `//right 45,500`


Keyboard Controls
-----------------


```
	d				Do commands
	c				Clear the drawing
	o				Return turtle to origin

	! (shift 1)		Show command tab 1
	@ (shift 2)		Show command tab 2
	# (shift 3)		Show command tab 3

	T				Toggle turtle visibility
	C				Toggle turtle centering
	R				Toggle page rotation

	+				Zoom in
	-				Zoom out

	? 				Show help/info dialog
```

Coordinates
-----------

### Cartesian
* The positive `x` axis extends horizontally to the right of the origin
* The positive `y` axis extends vertically upwards from the origin

### Polar
* The polar axis (0°) extends vertically upwards from the origin, ie the positive y-axis in conventional cartesian
* Angles increase from the polar axis in the **clockwise** direction




How to run
----------

> [!IMPORTANT]
> From version 0.9 onwards turtle will only run in `http` mode as it utilises JavaScript modules.
> Versions prior to that were runnable with `file://` protocol.


* Clone the repository
* Start up your favourite webserver, making sure the project repo is under the webroot
* Navigate to `[localhost]/turtle/index.html` or equivalent



Tasks
-----

More detail in the [task/](<./task/>) directory.

### Recently Completed

* Added keyboard controls
* Turtle can follow mouse clicks


### Currently working on

* Adding JSDoc type annotations
* Figuring out position maths
* Page/space customisation (dimensions/coordinates/precision)


### Future work

* Multi-turtle
* Command grouping for things like repeats and colours
