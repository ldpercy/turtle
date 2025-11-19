Coordinates
===========







JavaScript angle adjustments
----------------------------

The JavaScript standard for atan2 uses conventions from mathematics:

* The polar axis extends to the right from the origin, ie the positive x-axis
* Angles increase positively from the polar axis in the counter-clockwise direction

Depending on how the user configures the space, adjustments are made to the raw js calculations.

The turtle by default uses polar conventions commonly used in navigation:
* The polar axis extends up from the origin, ie the positive y-axis
* Angles increase positively from the polar axis in the clockwise direction



SVG Coordinates
---------------

Currently the page is presented in conventional cartesian coordinates.

Early versions used [standard SVG coordinates](<https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Positions#the_grid>) which inverts `y` compared to the usual presentation.

The ability to switch the page back into SVG mode is now a job under the [improve page and space](<../task/improve page and space.md>) task.



