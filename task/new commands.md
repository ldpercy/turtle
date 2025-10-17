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


