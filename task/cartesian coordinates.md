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


Also there's the general question of exactly *how* SVGPoints should work.
If they extend Point then their x and y should probably behave the same as Point ie cartesian.
If they don't extend but are independent then their x and y should properly represent svg coordinates.
I think I've gotten this a bit muddled so far, need to clarify.
Also angles *will* be different between the two.
Maybe it would better to have Point, SVGPoint and CartesianPoint? Not sure yet.

