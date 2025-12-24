Turtle styles
=============

Improve appearance and styling for the turtle graphic.

```
2025-12-12		Open task 🐢👗
2025-12-24		v0.10.2 done
```

This will be a bit of a random collection of things - some experiments, some improvements, some new stuff.

* Make the turtle look a little 'happier' esp when enlarged - at the moment he has a pretty dead stare
* Create a version of the graphic without all the css calcs
* See if zoom can be done with a simple transform instead of the css var calcs
* Add bandanas to the ninja turtles
* Experiment with some simple animations
* Improve the help dialog backdrop
* Some general CSS clean up
* Etc....



Turtles again
-------------

I'm still figuring out the details for getting styles and css properties into `use` items, making a little headway.
But the zoom properties i need like `transform-box` and `transform-origin` are still eluding me.

One thing I have found is that those properties work pretty well on ordinary (non-use) SVG elements, so I'm considering changing the turtle to just regular SVG.
I might also template-string it so I can pop extra copies down in anticipation of multi-turtle.

Have also begun an experiment for trying web-components in SVG, first try didn't work though, will keep hacking.


Non-use turtle
--------------

I've had a go at this and it seems pretty okay.
If anything it feels less janky in Firefox, which was definitely a problem especially when zoomed.
Also the origin to/from move weirdness has gone away, so this might end up better on a few counts.

The zoom effect becomes less complicated, but have guesstimated the transform-origin for the turtle for now.
Actually just tried this and 60% is about right:
```
	temp0.getBBox()
	SVGRect { x: -42, y: -60, width: 84, height: 102 }
```



Refactoring
-----------

I'm getting a little offtopic here, but I'm starting to think about a little bit of reorganising to go along with improving the turtle styles.

I'd like to move the turtle svg out of the html and into (probably) the SVGTurtle class where it can be templated, along with other turtle variants such as the ninja turtles.
Need to add some more turtle-instance info in there as well.
Additionally there are some things in that class that could perhaps be rehomed, maybe into proper page/drawing/document classes, but that would need some decisions regarding terminology.

Probably need something like:

* The app hosts pages or documents
* Each document represents a space that determines things like dimensions, coordinate systems, precision etc
* Turtles exist on documents/spaces (not sure which yet, probably documents) - documents could be instances of spaces, or instances of a more specific subclass, or something that composes a space
* Drawings exist within documents
* Documents could also define default colors, fonts, font sizes, stroke styles etc
* The app can present documents one-at-time or perhaps side-by-side, overlaid, offset etc


```
	html web page
		css
		js application
		html user interface
		svg document
```

I think at this stage I'd prefer to only consider having one main svg element on the page, and mostly refer to it as the 'document'.
I've been thinking about the possibility of saving/loading turtle drawings/setups, and i think I want regular svg docs to be those units.
They'd probably have to include extra turtle-specific data sections as script/json/text etc, but essentially they should be viewable statically in a regular browser.

I should probably then refer to the html host as the page or the app.

The document can have multiple spaces, but for now only has one.
Spaces can have different parameters, and be arranged within the document in different ways.

As for turtles it's probably going to be something like turtles are defined within the app/document (names, certain parameters), but are are placed onto (or into) spaces.

Spaces have drawings in them, of various kinds of groupings.




Wrapping up
-----------
I think i want to close this here so I can move on to some other tasks.

* Have redone the turtle to not use css calcs & simplified the drawing a little
* His eyes are a bit happier and friendlier now too
* The turtle is now added to the page as regular svg - no longer with `use` - so zoom effects are easier to apply
* Turtle movement is now done with a translate, which has seemingly fixed to to-from-origin weirdness
* Improved the look of the ninja turtles. Not sure if I can actually release them as-is without infringing on copyright though; prob need to rename or change the colours.
* Speculation about improved application/document structure
* Gave Terry a Santa hat for Christmas


Follow up work
* There's still a prevent default affecting ctrl-shift-r
* Still haven't fixed the backdrop for the help dialog
* Animations - SMIL etc
