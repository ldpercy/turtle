Turtle
======


I ended up so close to doing this while working out some polar maths for the year-clock I thought I might as well have a crack at it, a version of it at least.

Not going to implement the original syntax, just try to get some basic moves and turns working.



SVG bearing
-----------
There was a proposal to add 'bearing' to SVG's path commands, but is abandoned afaict:

https://lists.w3.org/Archives/Public/www-svg/2014Feb/0034.html

https://github.com/w3c/svgwg/wiki/SVG-2-new-features#new-path-features




Syntax
------

I started with JSON commands similar to this:
```js
[
	{ cmd:'forward',	args: {length: 10} },
	{ cmd:'turn',		args: {deg: 90} },
]
```

But quickly left it for being too verbose. Now using a simpler syntax like this:

```
right 15,500
circle 175
rect 250,500
marker
left 165,600
```
