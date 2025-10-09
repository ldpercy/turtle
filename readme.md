Turtle
======

A simple implementation of Turtle graphics using SVG and JavaScript.

* https://en.wikipedia.org/wiki/Turtle_graphics



I ended up so close to doing this while working out some polar maths for the [year clock](<https://github.com/ldpercy/year-clock>) that I thought I might as well have a crack at it, a version of it at least.

> [!TIP]
> Live on github pages: [ldpercy.github.io/turtle/](https://ldpercy.github.io/turtle/)


Syntax
------

Not going to implement the original logo syntax, will be similar in style though.

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

Coordinates
-----------

### Cartesian
I've recently changed this over to use conventional cartesian coordinates instead of SVG coordinates, but the ability to switch is still on the [my todo list](task/readme.md).

### Polar
* The polar axis extends up from the origin, ie the positive y-axis
* Angles increase positively from the polar axis in the clockwise direction




SVG bearing
-----------
There was a proposal to add 'bearing' to SVG's path commands (much in style of turtle graphics) which would have made the implementation even easier.

Unfortunately it is abandoned afaict:

https://lists.w3.org/Archives/Public/www-svg/2014Feb/0034.html

https://github.com/w3c/svgwg/wiki/SVG-2-new-features#new-path-features