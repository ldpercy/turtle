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




