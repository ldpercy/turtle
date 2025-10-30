Turtle follows mouse 🐢👉🐭
===========================


A random idea I had, not really traditional turtle at all.
Click the mouse on the page, and the turtle goes there.

The main problem for me are the page transforms I'm using, so converting a document click event's coordinates to local page points seems like a pretty hard problem.
Nonetheless, there are a couple of leads out there that seem to suggest that something like this might be possible, so I thought I'd check it out.


https://stackoverflow.com/questions/10298658/mouse-position-inside-autoscaled-svg
https://phrogz.net/svg/drag_under_transformation.xhtml
https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getScreenCTM


From the first:
```js
// Find your root SVG element
var svg = document.querySelector('svg');

// Create an SVGPoint for future math
var pt = svg.createSVGPoint();

// Get point in global SVG space
function cursorPoint(evt){
  pt.x = evt.clientX; pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

svg.addEventListener('mousemove',function(evt){
  var loc = cursorPoint(evt);
  // Use loc.x and loc.y here
},false);
```


https://stackoverflow.com/questions/69916593/what-is-the-replacement-for-the-deprecated-svgpoint-javascript-api



*It works.*


It works
--------

Yeah okay tbh didn't think it would be that quick or easy...
To be fair, it's only easy because whoevever designed the SVG apis did a darn solid job of it, so kudos to that guy.

So what to do with this now...

I think I'll try to implement the follows idea, but how it gets integrated into the main UI not sure yet.
To begin with should probably be an option that is off by default.
There's also whether it should draw or jump, and I want both I think, so need to sort that out as well.
As well as precision...

I'll start by having a click leave a single point marker on the page that moves to wherever you click.
You could have multiple, an array or groups etc, but just one for now.


Point markers
-------------

Have added a quick spot dropper, needs some work.
Thinking about changing them to a fuzzy point with a radial gradient.
The multiple points idea isn't too bad, but it would need a cleaner button, think I'll just change it to overwrite for now.

This also reminds me that the SVGTurtle isn't properly abstracted from the cartesian space yet.


### Update hover

Have changed over to use some planar space point math to get the polar position for the point as well - pretty cool.

The angle is reporting negative in the second quadrant (cw) though, need to fix that so it's positive instead.
Actually might need some sort of solution for angle reporting generally - the polar grid angles go from 0 to 360, so they're inconsistent too.
It's mostly a presentational matter though.


### Axis lines

Quickly added some dashed lines to the cartesian axes which look kind of neat.
But it immediately suggests a few things:
* Adding polar lines & angles as well
* Polar representation would need to be standardised or have options: 0 < a < 360 / -180 < a < 180
* Points and lines should probably be depedant on grid-type visibility
* Customising color + weight and/or zoom reactivity

For now I'm going to group points and lines with their respective grids so that visibility is applied together, but opinions may vary on this one.



### Aside: Display point?

Still need a consistent way of transforming abstract space points into points for display on the drawing area.
In the past having an SVGPoint extension proved not super good, at the time at least, but i do need something like it somewhere.
Maybe just having a more abstract `DisplayPoint` with is own transform, possibly as an extension, might be a better approach.
Will ponder.



### Points Lines

Point lines are now only on or off with their grids (no opacity changes) - works better for my brain.

