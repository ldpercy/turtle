Turtle
======



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





SVG path bearing
----------------
There was a proposal some time ago to add 'bearing' to SVG's path commands (much in style of turtle graphics) which would have made the implementation easier.

https://github.com/w3c/svgwg/wiki/SVG-2-new-features#new-path-features

https://lists.w3.org/Archives/Public/www-svg/2014Feb/0034.html

Unfortunately it is abandoned as far as I can tell.

