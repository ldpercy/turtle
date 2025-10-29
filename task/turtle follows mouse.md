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


