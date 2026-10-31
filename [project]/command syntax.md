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
More simply it will be:

	subject	verb data

Script Dialect/DSL?
-------------------

For most of this I think I'll consider drawings as side-effects, and just concentrate on abstract turtles moving in space.
But it's going to become something like:

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

To clear this up it looks like there be two turtle syntaxes:
* public command syntax
* js api syntax

And the above example is the js api syntax.
The js api will be richer than the cmd syntax, and for regular users some features will only be exposed by the ui.

Lets restrict th rest of this discussion to just the turtle command syntax.


What's being operated on
------------------------

The first item is always the subject, usually the turtle.
Possible entities:
* turtles - turtle, turtle[n], turtleName
* drawings or document layers
* *some* aspects of the space(s)
* *some* features of the document


### Setup
Sort of forces the question of whether the setup could or should be part of the cmd syntax.
I don't want it to be for now, but down the track it could.
I'd prefer that the page loaded ready to go, which presumes some setup.
Perhaps a different page mode could be added that included a setup cmd tab?
Probably to begin with having UI features for those would be better.