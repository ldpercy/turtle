Arithmetic
==========

> [!NOTE]
> In progress, subject to revision
>


* [Type definitions](types.md)


Turtle
------



* The turtle has a **position** which is comprised of a **location** and a **direction**.
* The position exists in a **space**
* Location is represented by an absolute **point** in the space
* Direction is represented by an absolute **angle** in the space



Angle
------

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

```js
Point {
	cartesian	: CartesianCoordinates
	polar		: PolarCoordinates
}
```

### Assignment

* Assignment to **point** is absolute and in terms of the space's coordinate system(s)
* Assignment to one or both of the cartesian coordinates will change the **point** and will have an implied effect on the polar coordinates
* Assignment to one or both of the polar coordinates will change the **point** and will have an implied effect on the cartesian coordinates
* Assignment to **point** is independent of any associated **direction**



### Addition

* Addition of **points** is equivalent to component-wise addition of cartesian coordinates
```js
	p1 + p2 = (p1.cartesian.x + p2.cartesian.x, p1.cartesian.y + p2.cartesian.y)
```
* Addition of points is **commutative**


### Subtraction

* Subtraction of **points** is equivalent to component-wise subtraction of cartesian coordinates
```js
	p1 - p2 = (p1.cartesian.x - p2.cartesian.x, p1.cartesian.y - p2.cartesian.y)
```
* Subtraction of points is **non-commutative**




Position
--------

```js
Position {
	location : Point
	direction : Angle
}
```

### Assignment

* Assignment to **position** is absolute and in terms of the space's coordinate systems
* Assignment to **location** is independent of **direction**
* Assignment to **location** is equivalent to **point** assignment as above
* Assignment to **direction** is independent of **location**
* Assignment to **direction** is equivalent to **angle** assignment as above



### Direction component

* Assignment, addition and subtraction to the direction component *alone* are equivalent to the corresponding **Angle** operations
* Assignment, addition and subtraction to the direction component *alone* are indedepent of **location**




### Location Component

* Assignment, addition and subtraction to the location component *alone* are equivalent to the corresponding **Point** operations
* Assignment, addition and subtraction to the location component *alone* are indedepent of **direction**



### Position addition - direction dependent

Direction dependent location addition is **position addition** - see below.



### Position Subtraction - direction dependent

Direction dependent location subtraction is **position subtraction** - see below.

