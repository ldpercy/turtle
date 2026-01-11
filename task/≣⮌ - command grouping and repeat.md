Command grouping and repeat
===========================


Implement command repeating and/or grouping


```
2025-10-28		new task
```

I've been playing around with some bicycle-spoke shapes that have simple angles such that they usually self-close/return to home after a certain number of iterations.
I'm interested to see what they would look like with evenodd svg fill.
At the moment however fill wont work as everything is just a set of disconnected lines, so thinking about ways to join up the lines into paths/polygons/polylines.

This crosses over with `repeat` which has been on the backburner for a while, so considering them together.


Syntax
------

I've had a few thoughts about this (no clue what will actually work yet though), current idea is something like:

```
repeat 6 {
	right 150,1180
	right 150,1400
}
```

That would just do the grouped commands 6 times to save some clicking, and if I can parse it would probably work okay with the current command list.

Though for path/polygon/polyline we can't really allow anything other than line segments (for now).
(We actually could allow other things, but compiling the output would get more complicated.)
So for starters if we limited the allowable command set it could look like:

```
path [repeat] {
	right 150,1180
	right 150,1400
}
```
Which would compile the commands into a single svg path element.
Allowing for svg path close options would be annoying, so to get the fill working you could do:
```
polygon [repeat] {
	right 150,1180
	right 150,1400
}
```
Which will close automatically, and all seems to looks okay so far...


### Grouping

Say I want to add a similarish `group` command that just wraps up a cmd set in `<g>...</g>` tags - what would that look like?

```
group [abc] {
	...
}
```

What are the arguments (if any) to group?
Name, id, title, class?
And if allow that, should I allow it for the other 'repeat' cmds?
Basically, are these generic or specific:
```
$command $arguments {
	$body
}
```
I think I *have* to make them specific, otherwise things won't be easily usable, and turtle should be a fairly simple language imo.
That means each groupable command has it's own semantics about args and body.

Probably then for `group` the argument should just be a name to go into `<title>...</title>` tags.
That would be okay.

### Colour

In this context, should probably also consider whether colour could be a grouped or modal command, or both.
Grouped seems to make more sense to me though; modal could get weird in an svg context, and might end up grouped anyway?
Not sure, probably just stick with grouped.


