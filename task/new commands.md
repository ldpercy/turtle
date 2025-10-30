New commands
============

I have a few new commands in mind that I'd like to try out, plus maybe some syntax adjustments for the existing ones.

```
2025-10-17		new task
```



Ideas
-----

Turtle move ideas:
* go to origin, but don't reset heading
* or as above, but generalised to go to x,y	without resetting heading (defaulting to origin)
* go to x,y plus set polar
* set heading to polar angle at any given position

The svg drawing commands could gain some moving variants:
* draw circle with the current position being on the diameter instead of the centre, move forward to the opposite diameter
* as above, but also provide an angle on the circle's perimeter to move the turtle to (updates heading)
* similar for ellipses, angles too if the maths is easy
* rect with move, see if there's any sensible syntax for moving to the midpoints and corners (8 or 16 points would be needed)
* not much can be done with text at the moment, except maybe a move forward/backward based on text size


New commands for polygon, polyline and path: add simple versions to just draw what's in the provided string.
These would probably have to work similar to 'text' where they're just drawn on the spot and rotated, but would need a translate as well.
Don't know if worth it, could be done though.


Also wondering whether it might be useful for some commands to have absolute and relative versions, a bit like the SVG path directive variants.
Unsure if needed, just a thought in the back of my head.

In a similar vein, drawing/non-drawing could be added as a switch of some sort for the move commands (instead of the modal pen up/pen down in trad turtle).
This would remove the need for the dedicated 'jump' command.
However the modal idea could be reintroduced for things like stroke and fill colours, maybe stroke width, would have to see how awkward that works out for the actual output.


Command categories
------------------

Want to clear this up because it's been in the back of my head for ages - commands will groupable based on a few properties, and if i can get it right I'll have a better chance of creating a nice consistent syntax.

* polar or cartesian (or other) - what coordinate types the arguments are
* absolute or relative - compared to the page or the current turtle position
* drawing or non-drawing - does the command add any drawing elements to the page?
* moving or non-moving - does the command change the turtles position?
* rotating or non-rotating - does the command change the turtle's heading?

For example if some move or draw commands could be made absolute or relative, or non-drawing (or whatever) with the use of certain modifiers that might be quite nice.
Modifiers could be flags, capitals, prefixes/suffixes etc.
Also some combos may or may not make sense, want to explore.

### Polar and cartesian, absolute and relative

Polar: left, right, bear, jump
Cartesian: move

So for example if any of these could be made non-drawing with a modifier, then jump would go away.
Also absolute versions could be made to go to certain spots on the page.
In that instance 'move' would be badly named, but 'movexy' 'xy' or 'cartesian' might be better.

For modifiers you could even use stock arithmetic operators to emphasize the maths of it:

```
xy	200,400		// Absolute - go to those coords
+xy 200,400		// relative - add those coords to the current
-xy 200,400		// relative - subtract from the current
```
That would be quite cool, but it would kind of imply that anything without the prefix was absolute.
But then there's more issues - are they also relative to turtle's heading...?
What about:
```
xy = 200,400	// absolute - go to these cartesian coords
xy + 200,400	// relative - add these coords to the current
xy - 200,400	// relative - subtract from the current

ra = 200,45		// absolute - go to these polar coords
ra + 200,45		// relative - add these polar coords (cf `bear`)
ra - 200,45		// relative - subtract these polar coords
```
The second last being nearly the same as the current `bear` command, except the order swapped. ( You could add an `ar` if needed too.)
Whether 'radius' or 'distance' makes more sense for the last two is also up for debate.
If I decide to use shorthands like these there'll be a land-grab for characters and a fight over things like degrees/distance, radius/radians.
Some of that could be handled with less-short shorthands:
```
rdeg = 200, 45
rrad = 200, 0.78
rpi  = 200, 0.25
rtau = 200, 0.125
```

Using arithmetic operators would tend to rule out having them in command or identifier names, so probably no 'rect-rounded' or anything like that unless spaces were enforced.
There's enough here that it's starting to look interesting.

### Drawing / non-drawing

So can any of those be modified again for drawing/non-drawing?
Most of the time drawing will probably be the default, so might only need a 'penup' type modifier, non-modal though.
Maybe something like:

```
xy ^= 200,400	// absolute, non-drawing
xy ^+ 200,400	// relative, non-drawing
xy ^- 200,400	// relative, non-drawing
```
In an operator land-grab now, so no caret for powers (not that I'm planning it...)
Actually on that point - a lot of this could well preclude or complicate any (much later) thought of adding variable arithmetic.
I'm seriously not intent on adding it *any* time in the foreseeable future, but it's a feature of most turtle/logo iirc, and someone might want to fork my project....???

Might open a totally speculative task to thought-experiment it and see if can leave the possibility open.

