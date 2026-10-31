Improve page and space
======================

Improve support for custom page sizes and space settings.

```
2025-10-17		new task
```

Intro
-----

So far I've been working with a fairly fixed page:
```js
this.page = new SVG.Rectangle(-2400, -2400, 4800, 4800);
```
And also using my preferred polar conventions of polar axis = up, polar direction = clockwise.

However it's always been my intention to allow these to become configurable to a degree, and some of the plumbing is already in place.

But it's not all working yet, and there are some implementation questions to be sorted out, like where the polar origin should be for non-symmetric pages.

So this is here to start wrapping some of these jobs together.
