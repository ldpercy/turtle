Improve rotation
================

I quickly put in a toggle to rotate the page with the turtle, but its a bit wonky at the moment.

The rotation actually needs to respond properly to the actual turtle movements, not just to it's current angle on the page.


### Turtle centering

Have also added a switch to center the turtle




Turtle rotation
---------------

At the moment the page updates for each instruction set performed when 'do' is clicked.
The position translate doesn't suffer from this as there's really only one way (for current purposes) to get from point A to point B.
But there are multiple ways to perform 'equivalent' rotations.
I've tried keeping the page rotation <= 180 degrees (absolute), but it's not as natural as I'd hoped.
I think I need the rotation to be *in the same direction as the turtle* and also less than 180 degrees.

So the 'do' command needs to return a bit more information about what it's done.
There are a few ways this could be done - for some of the other svg line options such as polygon or path we'd need to keep a point array to be compiled into an element at the end.
(Combining those with things like rect/circle/ellipse might get odd - will consider that later.)
But if I do end up history-keeping (and I probably will) the history could be used to return the final angle delta.

For now though I think I'll just add it as a turtle property or a 'do' return value.


Fixed?
------
In thinkering around with this I've think i've fixed it, but accidentally.
I've just set the page rotation to the actual turtle heading, and it works as expected now.
Maybe I was using a `mod`ed rotation before which produced the wonky jumps.
Anyways now it feels correct, and sending the turtle home unwinds his rotations in a pretty funny way.

