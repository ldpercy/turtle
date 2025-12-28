Command syntax
==============


For now this is more of a meta task to try to consolidate a bunch of the rambling i've been doing in other tasks.

I need to specify:
* what's being operated on
* what the operation is
* what the operation parameters are


I haven't gone back and looked at the commands and maths tasks recently, but I think I was at something like:

	[$turtle[.property]] [$operator|$command]  $argument

At the moment the turtle is assumed (Terry), the property is implied by the operation, and the operation is normally additive.



What's being operated on
------------------------

For most of this I think I'll consider drawings as side-effects, and just concentrate on abstract turtles moving in space.
But really it's going to become something like:

	[$entity[.property]] [$operator|$command]  $argument

So any syntax that works for turtles should be applicable to other user-controllable entities like the document/space/drawing etc.

eg
```
	ps = document.addSpace('planarSpace')
	terry = document.addTurtle('Terry')
	planarSpace.addTurtle(terry)
	terry.move(abcd)
```

But at that point I'm just recreating JavaScript with limited scope/sematics...
(And it looks like my setup code.)
It might be easier overall if I could leverage some built in things, but locking it all down to avoid arbitrary code....
Don't know if JS has any easy ways to create DSLs or very restricted dialects, will look around.

If the commands could be parsed into entities and methods, then they could be restricted to allowlists.

