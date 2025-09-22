Turtle
======


I've ended up so close to doing this while working out polar coordinates I might as well have a crack at it, a version of it at least.

Not going to implement the original syntax, just try to get some basic moves and turns working.

CF the [abandoned 'bearing' path directive](../path/path.md#Bearing)


If we go for UI input probably want something like a json array:
```js

[
	{ cmd:'forward',	args: {length: 10} },
	{ cmd:'turn',		args: {deg: 90} },
]

```
But simpler - maybe something like :

* move(heading, distance)
* moveXY(x,y)
* draw(heading, distance)
* drawXY(x,y)





Todo:
-----
* Dynamic viewbox resize
* option to switch between SVG and conventional coordinates (`y` up/down)
* Change or have options for line drawing - line, polygon, path
* Add some other svg shapes such as circle and rect




```
right 15,500
circle 175
rect 250,500
marker
left 165,600
```


Task: Split this to dedicated repo
----------------------------------

This has become enough of a project that it deserves it's own repo, so going to split it out.

For starters I think I'll just need these two directories:
* [library]
* turtle

Will be a little messy initially, but should be easy to clean up.
Will leave the current version of turtle in experiment-svg for now, the core library especially might be useful for other things.

From a local copy, something like this:
```bash
git-filter-repo --force --path ./[library] --path ./turtle
```


