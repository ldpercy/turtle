Arithmetic
==========


> [!NOTE]
> In progress, subject to revision


* The turtle has a **position** which is comprised of a **location** and a **direction**.
* The position exists in a **space**
* Location is represented by an absolute **point** in the space
* Direction is represented by an absolute **angle** in the space


Angle
------
```
	{
		// all equivalent to one another, changing one changes all
		degrees
		radians
		radiansPi
		radiansTau
	}
```

### Assignment

* Assignment to **angle** is absolute and in terms of the space's angular coordinate system
* Assignment to **angle** is independent of any **point**

### Addition

* Addition to **angle** is relative to the current angle
* Addition to **angle** is independent of any **point**
* Addition to **angle** is **commutative**

### Subtraction

* Subtraction from **angle** is relative to the current angle
* Subtraction from **angle** is independent of any **point**
* Subtraction from **angle** is **non-commutative**




Point
-----

```
	{	// equivalent to each other, changing one changes the other
		(x, y)			CartesianCoordinates
		(r, a)			PolarCoordinates
	}
```


### Assignment

* Assignment to **point** is absolute and in terms of the space's coordinate system(s)
* Assignment to one or both of the cartesian coordinates will change the **point** and will have an implied effect on the polar coordinates
* Assignment to one or both of the polar coordinates will change the **point** and will have an implied effect on the cartesian coordinates
* Assignment to **point** is independent of any associated **direction**



### Addition

* Addition of **points** is equivalent to element-wise addition of cartesian coordinates

	p1 + p2 = (p1.x + p2.x, p1.y + p2.y)

* Addition of points is **commutative**


### Subtraction

* Subtraction of **points** is equivalent to element-wise subtraction of cartesian coordinates

	p1 - p2 = (p1.x - p2.x, p1.y - p2.y)

* Subtraction of points is **non-commutative**



Direction
---------

As a part of a **position**

```
{
	direction Angle
}
```

### Assignment

* Assignment to **direction** is absolute and in terms of the space's angular coordinate system
* Assignment to **direction** is independent of **location**


### Addition

* Addition to **direction** is relative to the current direction
* Addition to **direction** is independent of **location**
* Addition to **direction** is commutative


### Subtraction

* Subtraction from **direction** is relative to the current direction
* Subtraction from **direction** is independent of **location**
* Subtraction from **direction** is non-commutative



Location
--------

As a part of a **position**
```
{
	location Point
}
```

### Assignment

* Assignment to **location** is absolute and in terms of the space's coordinate system(s)
* Assignment to one or both of the cartesian coordinates will change the **location** and will have have an implied effect on the polar coordinates
* Assignment to one or both of the polar coordinates will change the **location** and will have have an implied effect on the cartesian coordinates
* Assignment to **location** is independent of **direction**



### Addition - direction independent

Direction independent location addition is the same as **point addition** (above).



### Addition - direction dependent


Direction dependent location addition is **position addition** - see below.


### Subtraction - direction independent

Direction independent location subtraction is the same as **point subtraction** (above).


### Subtraction - direction dependent

Direction dependent location subtraction is **position subtraction** - see below.




Position
--------

```
	{
		location Point
		direction Angle
	}
```

### Assignment

* Assignment to **position** is absolute and in terms of the space's coordinate systems
* Assignment to **location** *or* **direction** are independent of one another
* Assignment to **location** is equivalent to **point** assignment as above
* Assignment to **direction** is equivalent to **angle** assignment as above





