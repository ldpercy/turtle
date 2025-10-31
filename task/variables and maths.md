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


Turtle maths vs page (space) maths
----------------------------------







Some tentative takeaways
------------------------

* plus, aka relative movement, is the default operator
* Evaluating expressions shouldn't have any side effects
* The command executor should accumulate pointer* operations (and output) and apply mutations at the end - actually not 100% about this one, might need to reconsider for SVG
* Page-relative addition and turtle-relative (pointer*) addition are different
* Points don't intrinsically have a heading, whereas the turtle does, so plain point math only applies in particular circumstances, not in general
* Underlying turtle functions should be pure pointer* operations that return other pointers*
* Absolute or page arithmetic can be done purely with plain points i think

(*) "Pointer" terminology to be determined

