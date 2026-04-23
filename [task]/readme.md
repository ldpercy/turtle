Task
====


Todo
----

### Bugs

* Chromium's colour picker goes offscreen - should really be fixed by the vendor


### General

* `html-common` There are changes coming in the pipeline for PlanarSpace - will need to fully test before upgrade
* Clean ways of centering polygons, esp centering about origin (not with translate)
* `validation` Text command string cleaning/validation - 'safe' unicode
* `terminology` Solidify terminology around page, app, document etc - some I'm using a bit loosely
* Need to review page rotation, as noted at the end of [fix angles](<v0/0.8.1 - fix angles.md>)
* An undo feature?
* Initial command sets to the tabs as examples for new users
* Improve/normalise general angle presentation, they're very inconsistent at the moment - doing this properly will be space or customisation option dependant
* `cmd` Different modes/command sets etc - basic/advanced for example
* `storage` Maybe save a few copies of the settings history with timestamps in localstorage, might be handy for debugging. Different command sets from different tabs maybe also?
* `cmd` Think about enforcing quotes for text commands, see below
* `validation` Find out if I need to do any special escaping for 'funky' strings in value & title attributes (also if needed for textarea)
* `css` See if the summary/details markers can be styled a little more nicely
* `validation` Check out what validation/cleaning I need for the command textarea & string
* `space` Custom spaces showing the polar axis and direction fixes
* `cmd` SVG drawing commands that *do* move the turtle, eg a circle that moves the turtle forward by the diameter
* `css` Add automatic colour scheme selection based on the user's preference
* `grid` Grid reactive to zoom level and/or turtle position
* Add local-frame grid overlays
* `idea` [Multi-turtle](<ꙮ🐢 - multi-turtle.md>)
* `task` [Command grouping and repeat](<command grouping and repeat.md>)
* `space` Custom space rules - size, boundaries, wrapping
* `space` Ability to switch between SVG and conventional coordinates (`y` up/down)
* `css` Work out how to apply different transition speeds to different items
* `cmd` Add SVG arc command - might be tricky to do nicely
* `cmd` Add colour commands for turtle to override defaults
* `style` Add fill colour picker
* `maths` Vastly improve floating-point handling - snapping, rounding, comparison, precision etc
* `cmd` Change or have options for line drawing - line, polygon, polyline, path



In Progress
-----------
* Export/save the svg output...???
* In the process of removing zoom effects on `use:hover` (turtle, marker) with zoom on ordinary SVG which works better. Zoom on `use` is trouble (shadow-dom style, transform origin, browser differences etc).
* JSDoc type annotations
* Origin/reset variants - eg one to go to the origin without resetting the heading
* Go to x,y command with/without line - initial version working, but needs to be properly integrated with new commands
* Figuring out position+point arithmetic
* Customisable drawing/viewbox sizes; dynamically draw grid to custom size
* Continue working on transition to drawing spaces / geometric spaces


Done
----
* Have found a way to eliminate the 5 extra vertical pixels - they come from SVG's default `display:inline;` - 'block' remedies it.
* localStorage items prefixed with 'turtle_'
* Initial colour scheme loading resolved for now
* Keyboard events now filter out `alt` `ctrl` & `meta` combos - [keyboard shortcut bug](<v0/0.12.1 - fix keyboard shortcuts.md>)
* Fixed the help/info dialog - backdrop, dismissal etc
* Conversion to use `html-common` submodule
* The weird to-from-origin turtle movement has gone away with the change to translate positioning
* The command box is gone, so the white flash in ff after a dark reload is no longer a problem
* Added some keyboard controls
* The turtleApp monolith has been broken up
* Added jsconfig & checkJs
* Current cmd set now saving on change
* Conversion to JS modules + http-only mode
* Added a turtle intro that writes 'Turtle' on the page on the very first load (eg if no storage present)
* Fix some excessive turtle rotation in some circumstances
* Turtle follows mouse clicks. Turns out mapping between mouse and page coords is built in to the API
* Use 'direction' instead 'heading' - there is a difference, but for the near future direction is much clearer
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


### Discarded items

* See if details/summary open/closed state can be saved in storage as well. Not needed for now, but could return to.
* Not exhibiting right? (Firefox) Turning the turtle on/off lightens/darkens the grids and I can't figure out why - doesn't seem to be css, might be a rendering effect?  This seeme to have gone away...