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


