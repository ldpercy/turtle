Task
====


Todo
----

### Bugs

* Bug in current cmd set not saving
* Initial colour scheme loading is still a bit wonky
* Eliminate the 5 extra vertical pixels
* Chromium's colour picker goes offscreen
* The command box flashes white in ff after a dark reload - find out what's causing that
* Find out what's going on with the turtle animation to/from the origin - it moves weirdly for those


### General

* See if details/summary open/closed state can be saved in storage as well
* Maybe save a few copies of the settings history with timestamps in localstorage, might be handy for debugging. Different command sets from different tabs maybe also?
* Export/save the svg output...???
* Think about enforcing quotes for text commands, see below
* Find out if I need to do any special escaping for 'funky' strings in value & title attributes (also if needed for textarea)
* See if the summary/details markers can be styled a little more nicely
* Check out what validation/cleaning I need for the command textarea & string
* Get custom spaces, including polar axis and direction, working properly
* SVG drawing commands that *do* move the turtle, eg a circle that moves the turtle forward by the diameter
* Add a couple of origin/reset variants - eg one to go to the origin without resetting the heading
* Re above, a general go to x,y command with/without line
* Add automatic colour scheme selection based on the user's preference
* Grid reactive to zoom level and/or turtle position
* Multi-turtle
* Looping
* Custom space rules - size, boundaries, wrapping
* Ability to switch between SVG and conventional coordinates (`y` up/down)
* Work out how to apply different transition speeds to different items
* Add SVG arc command - might be tricky to do nicely
* Add colour commands for turtle to override defaults
* Add fill colour picker
* Vastly improve floating-point handling - snapping, rounding, comparison, precision etc
* Add local-frame grid overlays
* Change or have options for line drawing - line, polygon, polyline, path



In Progress
-----------

* Turtle follows mouse clicks. Turns out mapping between mouse and page coords is built in to the API.
* Customisable drawing/viewbox sizes; dynamically draw grid to custom size
* Continue working on transition to drawing spaces / geometric spaces


Done
----

* Get Firefox & chrome's form styling more in sync
* Changed cmd arg parseInt to parseFloat to allow for fractional degrees
* Command textarea tabs
* Use local storage to maintain app settings
* Add a polar grid option
* Dark theme
* Conversion to conventional cartesian coordinates
* Page zooming with scale transform (better than viewBox resize)
* Add unit labels to the axis lines
* Rotate the page according to the turtle's perspective
* Add turtle-centering transform
* Split this repo from experiment-svg


