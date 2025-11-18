Commands
========


> [!NOTE]
> In progress, subject to revision


* Commands apply to the default turtle, Terry, unless specified otherwise
* Most commands are relative, or *additive* to the turtle's **position**
* [Type definitions](types.md)




Left, right, bear
-----------------

arguments:
```js
{
	radius
	angle
}
```


Maths:
```js
newPosition = currentPosition

	+ Position
	{
		location { polar { arguments.radius, arguments.angle } }
		direction { arguments.angle }
	}
```

Still not sure where the final rotation applies yet....
Is it in the position or after it?



Move XY
-------

Currently just `move`.
**NB** Needs a better name.


arguments:
```js
{
	x
	y
}
```

Maths:
```js
newPosition = currentPosition

	+ Position
	{
		location { cartesian { arguments.x, arguments.y } }
		direction { location.polar.angle }
	}
```

Still not sure where the final rotation applies yet....
Is it in the position or after it?



