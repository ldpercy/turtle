Add polar grid
==============

Add a polar grid option as an alternative to cartesian.

```
2025-10-14		v0.6a	start
```


Start
-----

The first worry that pops into my head is which angular units to show... will get degrees going first.

Will do this programmatically, might as well update the cartesian grid while I'm at it.

### Cartesian grid

Actually doing this programmatically will mean i get to stop using the pattern to draw the grid, which could well end up faster/lighter.
Just done; on my desktop ff the grid rendering is noticeably faster/cleaner - there was a bit of lag for the antialiasing here previously.


Dynamic Page and viewBox
------------------------

I've changed the page and viewbox to become dynamic which is mostly working, a few tweaks needed though.
The grid now only draws to the page's dimensions.

But compared to how it was previously the zoom needed to go in, so for now I've shuffled the zoom range and default along by one.
I might change this to become a page setting.

Also need to change the starting page translation, and maybe the turtle starting position.



Polar grid
----------

I've added a quick first go at a polar grid, looks okay.

I'm fiddling with line weights to try to make it look okay as it seems a bit 'heavy' on screen.
I might actually change these over to some brightness or opacity settings as looking good could depend on other factors like screen size, brightness & contrast - might be better to give a little control to the user.

I've added sliders to independently change the opacity for the polar and cartesian grids to address the concerns I had last night.

Need to sort out labels next.

Axis arrows
-----------

Before i get onto labels I've added some simple axis arrows - they could be improved a bit, but okay for now.
Getting them going and styled was a bit fiddly though; the markers don't exist in the same cascade as the lines they're applied to, so styles don't transfer directly.
Not sure if they exist in shadow-dom or something like that though - would like to see if there *is* a way of doing this a little more elegantly.


Okay, turns out there is a way of styling markers using their context - this is a bit of SVG2 that browsers have seen fit to implement:
```css
	fill: context-fill;
	stroke: context-stroke;
```
Exactly what I need.


Dynamic Labels
--------------

Have cartesian going, though I've hacked in the y-inversion for now - needs to be done properly.

Polar going as well now.
* same goes for y inversions
* polar-axis labels will need to be made space aware
* angle labels will need to be made space aware

A thought while considering those: for a space that uses mathematical conventions, that is the polar axis extends to the right, the turtle will have to start facing in that direction.
Otherwise it would be weird.

I've also added a little hover effect for the gridlines, not sure I'll keep it, but will leave for now, maybe tweak a little.

Will wrap shortly.


Local Storage
-------------

Just quickly hacked in a local storage save for the commands box - was totally way simpler than I'd anticipated (dunno why I thought it would be hard...).
Will add a bunch of other settings in as well, in a later task.


Wrapup
------

There are a couple of little details missing here but it's mostly done so will mop those up later.

* Moved all the existing cartesian grid code into the SVG library
* Grid drawing changed over to become dynamic
* Some preliminary changes to allow for setting viewBox to page, needs work though
* Added polar grid
* Added opacity sliders for the cartesian and polar grids so can be tweaked a little for different screens
* Added some axis arrows
* Labels are also dynamically drwan now, polar only degrees so far though
* Added title elements and a little hover effect for grid items - will need a little tweaking though
* Added an experimental local storage save for the command box


Follow up
* Add labels for axes (x, y, polar axis)
* Polish hover effects; add for labels
* Need to start properly testing at different page sizes - it's still kinda buggy
* Also different polar axis setups - these aren't working properly yet either

There are a bunch of other kinds of improvements that could be made, such as automatically adding/removing grid resolution at different zoom levels, but those sort of niceties can come much later.
Done for now.



