Turtle styles
=============

Improve appearance and styling for the turtle graphic.

```
2025-12-12		Open task 🐢👗
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

