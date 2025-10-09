Coordinates
===========



JavaScript angle adjustments
----------------------------

The JavaScript standard for atan2 uses mathematical conventions:

* The polar axis extends to the right from the origin, ie the positive x-axis
* Angles increase positively from the polar axis in the counter-clockwise direction

Depending on how the user configures the space, adjustments are made to the raw js calculations.

The turtle by default uses these polar conventions:
* The polar axis extends up from the origin, ie the positive y-axis
* Angles increase positively from the polar axis in the clockwise direction

