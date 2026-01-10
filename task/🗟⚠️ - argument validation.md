Argument Validation
===================

Solve malformed argument bugs.

```
2025-12-30		New task	v0.🗟⚠️
```

Not sure why I haven't tried this before, but malformed/invalid command arguments produce bugs of various kinds.

* The svg drawing cmds circle, ellipse, rect just produce svg with undefined or NaN in them, not ideal but not especially bad
* The text cmd currently appears to be vulnerable to some kinds of content injection - it can insert arbitrary svg, and scripts too (though i haven't gotten them to run yet)
* Malformed movement commands such as 'right asdf' break the zoom state


Refs:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/isWellFormed
* https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API
* https://developer.mozilla.org/en-US/docs/Web/API/TrustedHTML



Text
----

For the text cmd I think basic xml encoding, eg escaping `<>` should be the first job.
Validating the string to an allowlist, or excising out a blocklist could also be done.
There are a bunch of control characters in unicode that should probably be excluded.
I'll look around for recommended solutions.


Numeric & Structured arguments
------------------------------

I can think of a few approaches here, not sure which will work out best.

The initial thought is probably to add an `isFinite` check to the parseArgs fn, and invalidate the cmd if it fails.

That's fine for a first go, but I'm wondering about doing it for arbitrary structured data.
For example if had commands for creating turtles:
```
document addTurtle 'Teri',300,400
```
I probably wouldn't mix creation with positioning, but hypothetically in that case you'd need live typechecking against a type definition.
I recall doing something like that in some work projects, with typeguards I think.
That sort of stuff lies beyond my interest in own-coding (and doing it properly is way beyond my skill), though I could maybe do a very cheap version for now.
A library would be better.


Start work
----------
I'll start by doing some cheap fixes and see how that goes.
It looks like the command handling code is pretty hacky - a lot of it could be improved.

* Separate the command names from any aliases so that only canonical names get used in actual cmds (see if JSDoc has useful enums)
* Move some of the arg logic to the Turtle.Command class
* Add a proper isValid method/validation logic to detect bad commands


Typing for command args
-----------------------

Ugh.
There's probably a really obvious standard way to do this but it's not coming to me yet - so I'll spin through a few ideas and see what looks okay.


### First idea

Alright, took a bit longer than anticipated, but here's the first go.

I've created some small command classes that represent different command types and argument patterns:

* Command is the base class defines basic information about the command - name, cmd string, arguments, and the draw & valid flags
* Movement subclasses are (for now): Bear, Location, Position
* Bear commands have the pattern: angle, distance
* Location commands are: x,y
* Position commands are: x,y,r
* Drawing command subclasses are: Rectangle, Radius and Text
* Rectangle commands for rect and ellipse: width, height
* Radius command for circle: r
* Text has just the single string argument


Like this I can start to add specific bits of validation to particular argument types, for example I could specify that drawing parameters such as circle radii or rectangle parameters must be positive.

Some of this this will be a bit arguable and context dependent.
For instance SVG doesn't accept most negatives for sizing properties like radii, width, height etc, but mathematically they might be okay (though unusual).
A different output target entirely might be okay with those kinds of things (WebGL, WebGPU...).
Ideally I might want to be able to make the command language, and some of its stipulations a configurable item.

I've also been thinking recently about the possibility of using Silver for the command language.
I haven't gone back to it for ages, but it might be a nice way of sliding a little work on that in here.
It would have to be an alternative syntax though.


Validation & Bugs
-----------------

I already went in and added angle bracket escaping for text, though more attention will be needed there.

Malformed movement cmds are still producing bugs, so that's next.

I was curious about using Maps instead of objects for argument structures here - but I think they'll actually give me a little less type control for what I need right now.
Something to have in the back pocket though.

I've added a base implementation for Command.isValid that returns true when all the arguments are finite numbers, which applies to all cmds for now except text.
For text, for now I've added a totally token `isWellFormed` test.
It'll need some much stricter vetting of the input though - length, charset etc.

With that in mind I should probably also consider limiting the distance floats to 'reasonable' values for the space's dimensions.
Not sure the best way to do that just yet...
The relationship between the space and the document is still a bit so-so - I'd prefer to improve those first.


Thinking about wrapping this pretty soon as the main issues are resolved.



Space Typing
------------
Don't remember how I got onto it, but I started adding types to the PlanarSpace module and went on a bit of a spree.

I *think* I have it working, but some things to note.

* I've removed the old class-namespace era 'PlanarSpace.' prefixes
* I'm trying out CartesianCoordinates and PolarCoordinates as interfaces - implemented by Point and Location

There were also JSDoc typing issues with the convenience constructors I had on the main space class.
The method versions worked okay, but the 'inner' class versions weren't working, or at least i coudn't get them to work.
So for now I've added more method versions and using them instead.
I'm beginning to wonder if they're actually going to be necessary in the module world - still thinking about it though.

Also have begun changing the terminology a little as an experiment.
Instead of the main class being PlanarSpace, now just calling it Space, with the idea that Spaces will implement/inherit/conform to some kind of space signature.
Eventually this might mean that different compatible spaces could be 'plugged in' without changing too much code.
It's an idea anyway.

Also still having annoying problems with reading properties through getters - sometimes things come back as undefined.
*Really* need to figure out the rules there.



Shorthand commands and angle/direction
--------------------------------------

Am definitely running a bit ahead of the task here.
I've added documentation for some previously hidden commands that I felt happy enough with - `xy`, `xyturn` (previously 'xyr') and `~` for drawing suppression.

Now I'm thinking about position commands and in a bit of a quandary.

I also want `xya` for cartesian position, but the equivalent in polar would be `raa` - is that too weird?
For directions I might have to use `d` instead, giving `xyd` and `rad`.

That would be okay for 2d, but extending a syntax like to 3d would be pretty crazy - plus gimbal lock, quaternions.... let's not think about it.

But back to what I've just added, there should (potentially at least) be polar equivs such as `ra` and `raturn` (which looks *really* dorky).
I should probably start being more explicit about case sensitivity (which it is already) and use interCaps.
So we'd get `xyTurn` and `raTurn` which are better.


*	I've just noticed I've the optional distances aren't.
	Fixed.

While I'm thinking about it I'd also like some commands for setting or adding to single coordinates, but I should really shift this back over to the new commands task.


Wrapup
------


