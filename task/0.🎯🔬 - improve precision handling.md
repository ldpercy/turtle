Improve precision handling
==========================

The early versions of turtle had a few hacked-in rules for rounding near the origin.
It wasn't very good, and always needed to be revisited.

With the conversion to spaces I'd like to find some more systematic ways of handling all of this stuff.

I'd started forming a few thoughts in this regard:
* Spaces can have their own precision rules. Simple examples would be computer screens using whole numbers, and paper having printing limits.
* Turtles could also conceivably have own their precision limits - eg if it was a physical plotter limited by stepper motor accuracy.
* The ending result and position would end up being a negotiation between the two.

I'd also started imaginging what would happen if you had more unusual precision rules - for example more exotic spaces could be quantised in various ways.

For now though focus on just getting consistent precision rules for spaces going, something like rounding cartesian coords to x number of decimals.




