Common styles
=============

Use common styles from html-common.

[ldpercy-workspace task](<../../ldpercy-workspace/task/🖧👚 - common styles.md>)


```
2026-04-29		🖧👚		new task
```

### subtasks

* [x] Update app info dialog to common style
* [x] panel styles from html-common
* [x] Trim main heading space
* [x] No outlines on the labels
* [x] Colour selector label layout
* [x] Some of the gap spacing could be tightened a little
* [x] Chromium dark colour scheme glitch (sorted now)
* [x] figure out custom accent colour
* [x] Fix origin shortcut - changeover to common keyboard handler



Accent colour
-------------

I've been using a different accent colour for this project, so will have to change how I'm calculating scheme accents...

	accent-base-colour
	accent-colour
	accent-scheme-colour


Lots of changes
---------------

I'll try to list it all out when I wrapup, but a few notes while I'm thinking about it.

I'm taking out the global transition because it's too problematic to have around generally.
I've moved it to just the svg drawing area for now.
Will try to readd targeted transitions in places where it was nice in the old setup.

One thing to note it the marker use transitions are now not working, so will need to get those changed over/fixed somehow.



Panel colours
-------------

This one is killing me at the moment as they were all customised.

I have some stuff that's slowly progressing in html-common, but it's not good enough for here yet.

Getting a bit closer now...
