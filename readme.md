Turtle
======

A simple implementation of Turtle graphics using SVG and JavaScript.

* https://en.wikipedia.org/wiki/Turtle_graphics



I ended up so close to doing this while working out some polar maths for the [year clock](<https://github.com/ldpercy/year-clock>) that I thought I might as well have a crack at it, a version of it at least.

> [!TIP]
> Live on github pages: [ldpercy.github.io/turtle/](https://ldpercy.github.io/turtle/)


Command Syntax
--------------

* All angles are in degrees
* All distances are in SVG units (or 'pixels')
* Items in square brackets are optional and can be omitted
* NB some of these are likely to change soon


### Movement Commands

| command					| example		| description							|
|---------------------------|---------------|---------------------------------------|
| left angle[,distance]		| left 30,500	| bear left for the given distance		|
| right angle[,distance]	| right 45,500	| bear right for the given distance		|
| bear angle[,distance]		| bear 60,200	| same as right							|
| jump angle[,distance]		| jump 90,400	| bear without drawing line				|
| move dx,dy				| move 400,300	| move in the turtle's local frame		|


### SVG drawing commands

These do not move the turtle, but draw items at its current location and orientation.


| command				| example			| description										|
|-----------------------|-------------------|---------------------------------------------------|
| circle radius			| circle 100		| draw a circle with the given radius				|
| ellipse width,height	| ellipse 150,50	| draw an ellipse with the given width & height		|
| rect width,height		| rect 250,100		| draw a rectangle with the given width & height	|
| text string			| text Hello 🐢		| draw text with given string						|
| marker				| marker			| drop a marker flag - hover for position info		|


### Note

* Blank lines are ignored
* Unknown commands are ignored
* You can comment out a line by turning it into an unknown command, eg `//right 45,500`




Coordinates
-----------

### Cartesian
I've recently changed this over to use conventional cartesian coordinates (y axis up) instead of SVG coordinates, but the ability to switch is still on the [todo list](task/readme.md).

### Polar
* The polar axis (0°) extends up from the origin, ie the positive y-axis in conventional cartesian
* Angles increase from the polar axis in the clockwise direction



How to run
----------

> [!IMPORTANT]
> From version 0.9 onwards **turtle** only runs in http mode as it utilises JavaScript modules.
> Versions prior to that were runnable with `file://` protocol.






Tasks
-----

More detail in the [task/](<./task/>) directory.

* Working on position maths
* Ability to switch between SVG and conventional coordinates (`y` up/down)

