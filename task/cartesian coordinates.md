Cartesian Coordinates
=====================


At the moment everything is using [standard SVG coordinates](<https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Positions#the_grid>) which inverts `y` compared to the way cartesian coordinates are usually presented.


Want to add some sort of way to switch the display into a conventional cartesian mode.


Initial thoughts
----------------

A few initial thoughts about ways to approach this:
* Add an extension to the Point class called SVGPoint that translates the two coordinate systems.
* Add a page load url parameter to set the initial coordinate system - might have to be used if 'live' switching is too tricky
* A different possibly simpler way to do it would be to just apply a -1 scale transform to the y axis of the page, but not sure what that might do to things like labels/text etc.

My gut feeling is that the first is probably the best place to start, *but* it probably implies having two kinds of Turtles:
1. A first purely theoretical turtle that just tracks movements in a virtual cartesian space. It could also handle things like some of the core commands and maths, and maybe history.
2. A second 'SVGTurtle' that converts cartesian units to SVGUnits and handles all the drawing. Whether it's a subclass or just composed dont know yet.

I think something along these lines is likely the best way to go, and could definitely improve some things like separation of concerns, but probably at the cost of some added complexity.


SVGPoint
--------

I've created the SVGPoint class that extends Point, and it can report the underlying cartesian.
It seems correct so far.
I think I could at this point just swap the labels and report and it would mostly be correct.

Ah maybe not - the moveXY is not currently correct, it's still operating in SVG coordinates.

I think I need to start splitting the move mutators down to an underlying cartesian turtle to clear this up.


Man this is way more involved than I'd imagined - a bunch of little things:
* You can't instantiate and use a setter in one line like `a = new Foo().bar = 2`, not with anything I've tried so far at least
* There is a difference between methods written as `myMethod() {...}` and `myMethod = function() {...}` - in some cases only the first works
* Using accessors for compound properties doesn't seem to be working as I'd expected, eg `get foo() {return #foo}` with `foo.bar` doesn't always work - need to investigate

**Edit:** I've found a way to do the first:
```js
(p1 = new Point(2,3)).x = 22
```


Also there's the general question of exactly *how* SVGPoints should work.
If they extend Point then their x and y should probably behave the same as Point ie cartesian.
If they don't extend but are independent then their x and y should properly represent svg coordinates.
I think I've gotten this a bit muddled so far, need to clarify.
Also angles *will* be different between the two.
Maybe it would better to have Point, SVGPoint and CartesianPoint? Not sure yet.


Sub Instances / Super Instances
-------------------------------
Another thing:

* Subclass instances maintain separate copies of same-named fields from their super, they don't override/overwrite
**Edit** not true, see below

I feel like this might be different to some languages, I don't think I was expecting it.

For Turtle/SVGTurtle this might mean some mutators need to do double the work to maintain both the sub and the super.
Doesn't seem terribly pleasant or efficient.
It might only mean a handful of methods though.
Still wondering whether it might be better to compose the virtual turtle to make this relationship a bit clearer.

At the moment writing the code for Point/SVGPoint and Turtle/SVGTurtle is getting really knotty and confusing.
I'm sure I can make it work, but it really might be better to break the inheritance chain.

**Update:**
Public fields are shared between derived class instances and their super.
Private fields are *separate* between base and sub instances.

> Derived classes don't have access to the parent class's private fields

This could well have contributed to some confusion...


Coordinate systems
------------------

About now I'm starting to reconsider everything.
* Should I have separate kinds of point for different coordinate systems?
* Should I have separate classes for the coordinate systems themselves?
* Perhaps some Point methods could be moved to coordinate system classes?

There definitely could be benefits to moving towards something like this.
For example doing bulk operations like transforming a set of coordinates with matrices etc - that would need some kind of structure.
Also these that are currently sitting in the Point class:
```js
static origin = new Point(0,0)
static zeroRadian = Math.PI/2;
```
They would be better off as coordinate system concerns, particularly the second.
And though it's a secondary concern right now, fewer methods being duplicated could also lower the memory footprint a little bit.

Precision and related concerns like snapping might also be better homed with the coordinate system.
For instance a turtle following the same commands could end up in a different spot in coordinates that are rounded to a particular decimal.

This could also get way more abstract to allow for other spaces (manifolds?) like spherical, toroidal or hyperbolic.

So are SVG coordinates fundamentally different from cartesian coordinates?
Lots of operations will be the same, some of the angular stuff will be different though.

Need to clarify:
* Point - a place in a space
* Space - some kind of abstract n-dimensional volume that points exist in
* Coordinate system - a way of notating the position of points in a space

So maybe SVG and 'conventional' are just planar spaces that can use cartesian coordinates (or polar) but the spaces themselves are fundamentally inverted from each other on the y-axis.

I think an approach like this will work out better as it's more conducive to the idea of spaces having things like limits and rules.
For example a 'page' or 'screen' could be a space that is a specific size and no points exist outside it.
Non-planar spaces like spheres, tubes, toroids etc will have their own wrapping and equivalence rules (and doing movements in non-euclidean geometry could get kind of interesting).
Also, tubular space sounds awesome, especially for a turtle.

