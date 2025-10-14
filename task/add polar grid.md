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

