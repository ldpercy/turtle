Variables and maths
===================

This is *completely* speculative, just wondering theoretically what the syntax could look like.

I'm toying with adding some quasi-arithmetical syntax for things like equals, addition and subtraction to handle absolute and relative operations.

But it seems like syntactical land could be claimed that prevents or makes later additions difficult (if poorly chosen).


So lets imagine some far-future where I implement simple programming that allows for variable assignment and a little maths.
What could that look like?


Variables
---------

Built in variables:
* x
* y
* xy
* polar
* deg
* rad
* tau
* pi
* heading

These all represent something intrinsic about the current state of the turtle.
Assignment to them updates the turtle in some way.

Currently I'm speculating about using shorthands like these:

```
x = 50		// absolute assignment
y + 200		// relative, equivalent to 'y = y + 200'
deg - 90	// relative, equivalent to 'deg = deg - 45'
```

Which is nice and concise, but it smooshes an expression and a statement together which might cause problems.

Let's go oldschool and use $ for user-defined variables.
Say we have some angle we're trying to build out of two other angles.
This is straightforward enough:
```
$myangle = 50	// assignment statement
$myangle + 25	// assignment to existing value with addition
```
But a common construction like this would then become a bit strange/counterintuitive:
```
$a1 = 50	// assignment
$a2 = 25	// assignment
$a3 = ($a1 + $a2)
```
What does the third line mean? Does it do an update assignment to $a1 first which is then assigned to $a3?
What if you don't want $a1 updated?
You could do them one at a time, but that would get long-winded for anything non-trivial.

Another approach would be to assert that anything inside parentheses is an expression, and no assignments occurred.
That could probably be made to make sense, but not sure if really worth it.


Current turtle statements
-------------------------

What about the commands I have currently?
Not that they're necessarily good examples, but do they fit into statement/expression?
```
left degrees[,distance]
right degrees[,distance]
bear degrees[,distance]
jump degrees[,distance]
move dx,dy
circle radius
ellipse width,height
rect width,height
text string
marker
```

At the moment, the way they're written/evaluated, they're more statements than expressions, in that none of them actually evaluate to anything, and all changes are side-effects.
However, you *could* change the whole reading of the command text by presenting it like this:
```js
const svgOutput = `
	${right(162,1000)}
	${right(162,900)}
	${marker}
`;
```
Written like this (which isn't all that far from what I'm doing now) it's clear that the commands *could* evaluate to something, in this case the string output, and turtle mutations would be side-effects.
That would okay for SVG, but less so for a virtual turtle which has no implied output.
For a virtual turtle the functions might be better off evaluating to the new turtle state (stateless), or returning the turtle obj (stateful), so that methods could be chained:
```js
const tony = new Turtle(...);
tony.right(162,1000)
	.right(162,900)
	.marker()
`;
```
(Though marker in this case would be something like a history array entry.)

You could even combine the two in a few different ways:

```js
const tony = new SVGTurtle(...);
result = tony.right(162,1000)
			.right(162,900)
			.marker()

// result = { turtle, output }

```
This would work for a mostly stateless turtle wherein you make each 'result' it's own state/output accumulator.

A stateful version would be similar, but you'd probably have to call a flush or getOutput method whenever you wanted to draw an update.



### Sooo...

Does any of this inform the syntax I'm speculating about?
* Commands can be interpreted as mutation functions, the return values of which could vary depending on how you wanted to implement things
* In a stateless, no-side effect setup, all changes & output are encapsulated by the return
* Evaluating expressions shouldn't have any side effects

Does that mean the underlying turtle functions should be mostly pure??
Operate on arguments, no immediate side-effects, return & accumulate results, let the command processor actually perform mutations?
Something like that at least....

So you could write something like
```
$p = (xy(10,10) + x(10) - polar(45,20))
```
Each of the individual expressions evaluates to a point, the operation would be virtual which just returned another point position (or a delta).
None of which has any side effects.

Other variables or 'globals' could be used in expressions:
```
$foo = (turtle + $p)	// no side effects
```

Not too sure how to decompose yet though:
```
$foo.degrees = (turtle + $p)
```
That would be sweet, but lots of variants required, and likely tricky.
Also if you wanted to break type for weird effects:
```
$foo.degrees = (turtle.x + $p.y)
```

For commands in the command box it's assumed that the turtle is being operated on:
```
turtle = xy(50,50)		// not this
= xy(50,50)				// just this

// or ...

turtle = turtle + xy(123,456)		// not this
+ xy(123,456)						// just this
```

So...
**plus is the default or assumed operator**

### Command equivalence

If the turtle is the default thing being operated on, and plus is the default operator, then these would all be the same:
```
+ xy(123,456)
xy(123,456)
xy 123,456
```

Which also works for things like left, right and bear, and other polar operations.

It's still not clear to me whether this is relative to the heading (the moving frame) though.... I mean I think it is...
Everything else is...
That means that relative, aka addition, has different kinds of addition - page addition, where all coordinates/deltas are page respective, and turtle addition where all coordinates/deltas are relative the turtles current frame.
So I might need to go over arithmetic again to be clear.

I really need a word for things that have position and direction (or orientation), an abstraction of a turtle, and vector doesn't seem right.
I can't think of a proper mathsy term for it yet - just like a pointer or arrow or 'orientable' or something.
Need to find this out as Turtle maths is "pointer" maths.
Practically everything in the universe could have this property...
Is it just a position vector in disguise?


https://en.wikipedia.org/wiki/Six_degrees_of_freedom
https://en.wikipedia.org/wiki/Degrees_of_freedom_(mechanics)
https://engineeringstatics.org/Chapter_05-degree-of-freedom.html

Probably just position (2d):
	x
	y
	orientation/direction




Turtle maths vs page (space) maths
----------------------------------

So this really becomes position maths vs point maths.

* point + point = point
* position + cartesian point = position		- equivalent to my current move(x,y)
* position + polar point = position			- left, right, bear etc
* position + position = position			- with an extra turn at the end i think

* point arithmetic is commutative (equiv to position vector addition i think)
* not sure whether position + point === point + position yet - might depend
* same for position arithmetic - not sure yet whether they commute either

The ordering of how you interpret location and orientation matters, which means that point and rotation addition is *not* commutative.
For instance these are different:
* starting point + rotation + point
* starting point + point + rotation


**The 'natural' interpretation of a position triple is a point *then* a rotation.**

This will probably end up being pretty fundamental to everything, and probably become a core rule or axiom for PlanarSpace.
(Other spaces are available.)

It will mean that:
* position + point != point + position		- non-commutative
* position1 + position2 != position2 + position1 - also non-commutative


If these are all correct and reasonable and consistent, then I should be able to push a bunch of this new 'position maths' into the PlanarSpace.
Set up some Position classes as Types and have the turtles become a bit dumber in a good way.

I'll return to what it means for syntax shortly.





Some tentative takeaways
------------------------

* The turtle is the assumed thing being operated on - for instance current commands could be read as `turtle.right 123,456`
* Plus, aka relative movement, is the default or assumed operator
* Evaluating expressions shouldn't have any side effects
* Points don't intrinsically have an orientation, whereas positions do, so plain point math only applies in particular circumstances, not in general
* 'Position' - location and orientation - is the turtle abstraction to think in terms of
* The 'natural' interpretation of a position is a point *then* a rotation
* Point addition and position addition are different - point addition commutes, position addition does not
* Adding points to positions and vice-versa is also non-commutative
* Underlying turtle functions should be pure position operations that return other positions
* Position arithmetic should be moved to the PlanarSpace

Plus something like:
* The command executor should accumulate position operations (and output) and apply mutations at the end - actually not 100% about this one, might need to reconsider for SVG



Back to syntax for a bit
------------------------

Still fuzzy on this, so just going to dump some ideas and see what might make sense.

The default turtle is the assumed thing being operated on, and plus is the default or assumed operator.
So these could be equiavelent:
```
right 45,500					// what I have currently
turtle.right 45,500				// method syntax, apply this operation (mutation) to the turtle
turtle.right(45,500)			// as above, but more typically
+ right 45,500
turtle + right 45,500			// arithmetic syntax - add this position to the turtle's position
```

I think under the hood the method syntax will actually perform the add operation (last one above), that is 'add this position to the turtle'.
However there's kind of a twist here:

**I said earlier that the 'natural' interpretation of a position triple is 'location then rotation'.
These operations however are applied the other way around - 'rotate then move'.**

So is this inconsistent, or do i just need to clarify the meanings of some things?

For example, it would mean that 'right(45,500)' is equivalent to constructing these positions:
(The convention for polar coordinates has the distance first)

	polar (dist, ang, rot)		: (500, 45, 45)
	cartesian (x, y, rot)		: (353.6, 353.6, 45)

And if you break the rotations out, these should all be the same:

	position = rotate(45) + xy(0,500)					// left,right,bear are this
	position = rotate(45) + polar(500,0)				// or this, depending how you view things
	position = xy(353.6, 353.6)	+ rotate(45)
	position = polar(500,45)	+ rotate(45)


So left, right and bear do the rotations first, and *point* moves second.
That seems probably okay, as long as everyone understands that's what it means.

### Subtraction & negatives
What about subtractions - how would they work?
I'm pretty certain that $rot - $rot = 0 and $point - $point = 0, but does $pos - $pos equal 0?














