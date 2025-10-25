Task
====


Todo
----

### Bugs

* Eliminate the 5 extra vertical pixels
* Chromium's colour picker goes offscreen
* The commands box flashes white in ff after a dark reload - find out what's causing that
* Find out what's going on with the turtle animation to/from the origin - it moves weirdly for those


### Features

* Get custom spaces, inclucidng polar axis and direction, working properly
* SVG drawing commands that *do* move the turtle, eg a circle that moves the turtle forward by the diameter
* Add a couple of origin/reset variants - eg one to go to the origin without resetting the heading
* Re above, a general go to x,y command with/without line
* Add automatic colour scheme selection based on the user's preference
* Grid reactive to zoom level and/or turtle position
* Multi-turtle
* Looping
* Custom space rules - size, boundaries, wrapping
* Customisable drawing/viewbox sizes; dynamically draw grid to custom size
* Ability to switch between SVG and conventional coordinates (`y` up/down)
* Work out how to apply different transition speeds to different items
* Add SVG arc command - might be tricky to do nicely
* Add colour commands for turtle to override defaults
* Add fill colour picker
* Vastly improve floating-point handling - snapping, rounding, comparison, precision etc
* Add local-frame grid overlays
* Change or have options for line drawing - line, polygon, polyline, path


### Improvements
* Get Firefox & chrome's form styling more in sync



In Progress
-----------

* Using local storage to maintain app settings, eg the command box for Chrome
* Continue working on transition to drawing spaces / geometric spaces


Done
----

* Add a polar grid option
* Dark theme
* Conversion to conventional cartesian coordinates
* Page zooming with scale transform (better than viewBox resize)
* Add unit labels to the axis lines
* Rotate the page according to the turtle's perspective
* Add turtle-centering transform
* Split this repo from experiment-svg


