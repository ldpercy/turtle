Task
====




Todo:
-----
* Dynamic viewbox resize
* option to switch between SVG and conventional coordinates (`y` up/down)
* Change or have options for line drawing - line, polygon, path
* Rotate the page according to the turtle's perspective




Task: Split this to dedicated repo
----------------------------------

This has become enough of a project that it deserves it's own repo, so going to split it out.

For starters I think I'll just need these two directories:
* [library]
* turtle

Will be a little messy initially, but should be easy to clean up.
Will leave the current version of turtle in experiment-svg for now, the core library especially might be useful for other things.

From a local copy, something like this:
```bash
git-filter-repo --force --path ./[library] --path ./turtle
```


