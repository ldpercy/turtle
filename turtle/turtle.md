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





