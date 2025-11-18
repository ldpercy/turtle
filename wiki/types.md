Types
=====


> [!NOTE]
> In progress, subject to revision




Angle
-----

```js
{
	degrees			: Number
	radians			: Number
	radiansPi		: Number
	radiansTau		: Number
}
```

All equivalent to one another, changing one changes all.


CartesianCoordinates
--------------------

```js
{
	x	: Number
	y	: Number
}
```


PolarCoordinates
----------------

```js
{
	radius	: Number
	angle	: Angle
}
```


Point
-----

```js
{
	cartesian	: CartesianCoordinates
	polar		: PolarCoordinates
}
```
Equivalent to each other, changing one changes the other.


Position
--------
```js
{
	location : Point
	direction : Angle
}
```

Fully expanded position looks like:

```js
p : Position
{
	location : Point
	{
		cartesian	: CartesianCoordinates
		{
			x	: Number
			y	: Number
		}
		polar	: PolarCoordinates
		{
			radius	: Number
			angle	: Angle
			{
				degrees			: Number
				radians			: Number
				radiansPi		: Number
				radiansTau		: Number
			}
		}
	}
	direction : Angle
	{
		degrees			: Number
		radians			: Number
		radiansPi		: Number
		radiansTau		: Number
	}
}
```