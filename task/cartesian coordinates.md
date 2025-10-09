Cartesian Coordinates
=====================


At the moment everything is using [standard SVG coordinates](<https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Positions#the_grid>) which inverts `y` compared to the way cartesian coordinates are usually presented.


Want to add some sort of way to switch the display into a conventional cartesian mode.


Initial thoughts
----------------

A few initial thoughts about ways to approach this:
* Add an extension to the Point class called SVGPoint that translates the two coordinate systems.
* Add a page load url parameter to set the initial coordinate system - might have to be used if 'live' switching is too tricky
* A different possibly simpler way to do it would be to just apply a -1 scale transform to the y axis of the page, but not sure what that might do to things like labels/text etc.

My gut feeling is that the first is probably the best place to start, *but* it probably implies having two kinds of Turtles:
1. A first purely theoretical turtle that just tracks movements in a virtual cartesian space. It could also handle things like some of the core commands and maths, and maybe history.
2. A second 'SVGTurtle' that converts cartesian units to SVGUnits and handles all the drawing. Whether it's a subclass or just composed dont know yet.

I think something along these lines is likely the best way to go, and could definitely improve some things like separation of concerns, but probably at the cost of some added complexity.


SVGPoint
--------

I've created the SVGPoint class that extends Point, and it can report the underlying cartesian.
It seems correct so far.
I think I could at this point just swap the labels and report and it would mostly be correct.

Ah maybe not - the moveXY is not currently correct, it's still operating in SVG coordinates.

I think I need to start splitting the move mutators down to an underlying cartesian turtle to clear this up.


Man this is way more involved than I'd imagined - a bunch of little things:
* You can't instantiate and use a setter in one line like `a = new Foo().bar = 2`, not with anything I've tried so far at least
* There is a difference between methods written as `myMethod() {...}` and `myMethod = function() {...}` - in some cases only the first works
* Using accessors for compound properties doesn't seem to be working as I'd expected, eg `get foo() {return #foo}` with `foo.bar` doesn't always work - need to investigate

**Edit:** I've found a way to do the first:
```js
(p1 = new Point(2,3)).x = 22
```


Also there's the general question of exactly *how* SVGPoints should work.
If they extend Point then their x and y should probably behave the same as Point ie cartesian.
If they don't extend but are independent then their x and y should properly represent svg coordinates.
I think I've gotten this a bit muddled so far, need to clarify.
Also angles *will* be different between the two.
Maybe it would better to have Point, SVGPoint and CartesianPoint? Not sure yet.


Sub Instances / Super Instances
-------------------------------
Another thing:

* Subclass instances maintain separate copies of same-named fields from their super, they don't override/overwrite
**Edit** not true, see below

I feel like this might be different to some languages, I don't think I was expecting it.

For Turtle/SVGTurtle this might mean some mutators need to do double the work to maintain both the sub and the super.
Doesn't seem terribly pleasant or efficient.
It might only mean a handful of methods though.
Still wondering whether it might be better to compose the virtual turtle to make this relationship a bit clearer.

At the moment writing the code for Point/SVGPoint and Turtle/SVGTurtle is getting really knotty and confusing.
I'm sure I can make it work, but it really might be better to break the inheritance chain.

**Update:**
Public fields are shared between derived class instances and their super.
Private fields are *separate* between base and sub instances.

> Derived classes don't have access to the parent class's private fields

This could well have contributed to some confusion...


Coordinate systems
------------------

About now I'm starting to reconsider everything.
* Should I have separate kinds of point for different coordinate systems?
* Should I have separate classes for the coordinate systems themselves?
* Perhaps some Point methods could be moved to coordinate system classes?

There definitely could be benefits to moving towards something like this.
For example doing bulk operations like transforming a set of coordinates with matrices etc - that would need some kind of structure.
Also these that are currently sitting in the Point class:
```js
static origin = new Point(0,0)
static zeroRadian = Math.PI/2;
```
They would be better off as coordinate system concerns, particularly the second.
And though it's a secondary concern right now, fewer methods being duplicated could also lower the memory footprint a little bit.

Precision and related concerns like snapping might also be better homed with the coordinate system.
For instance a turtle following the same commands could end up in a different spot in coordinates that are rounded to a particular decimal.

This could also get way more abstract to allow for other spaces (manifolds?) like spherical, toroidal or hyperbolic.

So are SVG coordinates fundamentally different from cartesian coordinates?
Lots of operations will be the same, some of the angular stuff will be different though.

Need to clarify:
* Point - a place in a space
* Space - some kind of abstract n-dimensional volume that points exist in
* Coordinate system - a way of notating the position of points in a space

So maybe SVG and 'conventional' are just planar spaces that use cartesian coordinates (or polar) but their cartesian coordinate systems are inverted from each other on the y-axis.

I think an approach like this will work out better as it's more conducive to the idea of spaces having things like limits and rules.
For example a 'page' or 'screen' could be a space that is a specific size and no points exist outside it.
Non-planar spaces like spheres, tubes, toroids etc will have their own wrapping and equivalence rules, and maybe coordinate systems too (and doing movements in non-euclidean geometry could get kind of interesting).
Also, tubular space sounds awesome, especially for a turtle.


Inner Classes
-------------

It looks like you *can* use inner classes in JavaScript - I was unsure about that.
I've only tried a couple of trivial examples so far, so don't know yet if there are any fatal gotchas or annoying details or whatever.

However if they turn out mostly okay it will open up a stack of new possibilities for ways to organise code nicely.

For example when it comes to the idea of 'spaces' I could (potentially) do stuff like this:

```js
class PlanarSpace {

	name = 'Name of space';

	constructor(name, size) {
		this.name = name;
		this.size = size;	// could be fixed or unbounded
	}

	static Point = class {
		constructor(x,y) {
			this.x = x;
			this.y = y;
		}
	}/* Point */

}/* PlanarSpace */
```
So that particular kinds of points are grouped with their geometric spaces.
Don't know if I'd end up to doing it exactly like that, but this might end up better organised than having a bunch of free-floating FooPoint type classes.
Like this a 3d space could have it's own version of Point, and maybe a couple of different polar point versions.
Semi-planar spaces like spheres, tubes and toroids could maybe still use a 2d cartesian point, but it would probably depend on how the spaces were defined.


Coordinate systems again
------------------------
Still don't know yet how to describe the different coordinates systems that might be used for a space, eg 'regular' and svg coordinates.
It might be nice to be able define custom coordinates for instance.

```js
screen1 = new PlanarSpace('My computer screen');
screen1.size = {horizontal:1920, vertical:1080};
screen1.coordinates.screen = { horizontal.zero:left, vertical.zero:top }
screen1.coordinates.regular = { horizontal.zero:left, vertical.zero:bottom }
screen1.coordinates.centered = { horizontal.zero:middle, vertical.zero:middle }
```
If there was a way to talk 'through' custom coordinates set up like this that would be quite neat, but really very unsure if this is a good approach, or even how to do it.
You'd also need to describe in which direction the coordinate values increase for the centered one.

It would probably make sense to have at least one built in default coordinate system though.


Turtles and their spaces
------------------------

Brain was spinning on this while trying to sleep last night.
Say we have some kind of space defined, how do we put a turtle on it?
Starting with the simple case of a 1-to-1 turtle-to-space relationship (but I'm already imagining more):
```js
page = new PlanarSpace('SVG drawing space');

leonardo = new Turtle();
leonardo.space = page;
leonardo.position = page.origin;
```

From this point all the moves will end up being a negotiation between the turtle and the space.
Some moves might be prevented or truncated by boundaries, some might result in rounding or snapping.
The resulting turtle position and orientation gets updated, probably in the space's default or native coordinates, and those values can be converted via the space to other coordinates.

I kind of feel like that would probably do it, for an abstract turtle maybe.

Like this I think I can probably get SVGPoint out of the complicated place it's sitting in now.
The idea of the SVGTurtle might also end up a bit redundant, but it would have to be replaced by something like a TurtleSVGRenderer.
Not sure how that would work yet, but it's better separation of concerns.
You could perhaps use a renderer as a wrapper object such that the wrapper took the commands and passed them on, rendering the difference.
Not sure how clean that would be though.
A different approach would involve codifying a set of movements somehow to be passed separately into the renderer to return the output.
Pros and cons, the second would be better for some kinds of things.


Have a crack
------------
I've made enough of a mess in this branch already, might as well have another try.... I can always reset and start again.
Thinking now the idea of SVGPoint and SVGTurtle seems kind of like a noob error. Oh well.

Will start by trying to move some of the euclidean geometry to a PlanarSpace class.
Don't know if I need/want a 'space' base class yet - will come back to.

It's already starting to look much better.
Hope it stays this way.
I'm wondering If I can eliminate the difference between a point and polar point, and have them implicitly convert as needed much like the angle class...?
That would be quite nice.



Points attached to spaces
-------------------------
A few of the methods for points rely on the origin point.
Usually in a planar space the origin will be at (0,0), but it seems arbitrary and *possibly* changeable so I've started making it a parameter to the space.
(Though I can't actually think of any real-world examples of non-zero origins yet...)

The problem is then each Point either needs to know where its origin is, or know what space it exists in so it can refer to the space's origin.

Which means attaching a point to a space at creation time, which is giving me a few coding headaches.

So then a few philosophical questions:

* Should a point always be attached to a space? Usually... but maybe not?
* Could a point exist in more than one space? Maybe...  but it might be better to simulate that with mimic points for each space (rather than have single point instance track all it's spaces).
* Should each point have it's own origin, or use its space's origin? I'd prefer the second in most cases.
* Could there be a 'default' space instance for points to be created into? Not really sure, or even how to do it.
* Should a space track its points? Doesn't seem super necessary right now, but maybe could be useful in future - for example say you wanted to do a bulk transform on a space and its occupants, *something* needs to track them, perhaps not the space's job though.

I'll say at this point things aren't *super* clear, but I'm pretty sure (for now at least) I want points to exist in a space, and keep a reference to it.
Other requirements are available.

### Attaching points to spaces

Back to this then.
Last night I tried to see if inner classes are aware of their outer classes, but didn't have much luck.

First thing I tried was modifying the convenience constructor I'd made:
```js
class PlanarSpace {
	...

	Point = class {
		constructor(name, space=this.space) {
			return new PlanarSpace.Point(...arguments);
		}
	}/* Point */

	...
}
```
But `space=this.space` doesn't work, the `this` is the new instance's this, not the outer class's.
I'm not sure if there are ways of making class expressions dynamic in any way to allow for something like this.
Or there might be some fancy binding trick or something.

A couple of other approaches that would do for now:
* Enforce that 'space' is set by throwing an error (i'd rather not)
* Use a factory function instead of the convenience constructor for making new space points

I'm leaning towards the second. It would look like this:
```js
class PlanarSpace {
	...

	newPoint(name) {
		return new PlanarSpace.Point(name, this);		// pass in the space instance ('this') to the Point constructor
	}

	...
}
```
I think that will have to do for now unless I find something better.
It will mean that space users (who are ignorant of the actual concrete space) will go from:
```js
fooPoint = new fooSpace.Point('bar', fooSpace);
```
to:
```js
fooPoint = fooSpace.newPoint('bar');
```
Which isn't quite as snazzy, but gets the job done.

### Other space entities
Does any of this apply to any other entities (apart from points) that I'm starting to attach to spaces, or might in future?
* coordinates
* angles
* origin
* zero or reference angle
* size/shape/metrics
* rules
* precision/rounding/snapping
* lines/volumes/groups etc

At the moment the question only really applies to coordinates and angles, and the problem only exists when a space entity *needs* to refer to it's particular space instance for some reason.

Right now the way planar angles are written they're fairly agnostic, but it's possible they could get dragged into this.
If an angle needed to be an absolute direction in a space then yes, that refers to the space's zero angle.
Mostly I think that will belong with the client coder though, will see.

Coordinates could defer to their space for their default values, but not much else I can think of.
I reckon it's fair to create some coordinates that might exist outside a space and ask questions about those (points too on that count).



### summary

* Space entities that need a reference to their space must be constructed with a factory function
* Instance factory functions are named `newEntity`


### Polar coordinates for non-zero Origin

Just realised something - if I allow for specifying a non-zero origin in cartesian coordinates, then equivalently the origin should be non-zero in polar coordinates.
Problem is, that could lead to some really unpleasant maths with *really* tiny angles if the origin is very far away from zero.
So think think think....
* The polar 'origin' could always be relative to the cartesian origin, so that the angles stay reasonable...
* Or, wind some of this back and fix the origin to (0,0) and let the client handle any spatial translation...

To be honest, for sheer simplicity, I'm inclined to do the second.
Having non-zero origins is a nice idea, but it might be a bit too niche for the trouble.
Having a space translate/transform of some sort at the client side is probably better.

So...

Sigh. I can probably wind some of this back.

Do points (or other entities) still need to be attached to their spaces?
For now actually I think I'm going to say yes, but not for the origin.
The zero-angle one still could end up being a space parameter.
I mean it sounds like it too could be handled with a client side transform...
But a rotational transform might be easier done in the Space where I'm already doing trig, so the client only needs to worry about arithmetic.
Pretty arbitrary, but would be nicer for the clients.

Look it's not super perfect but I'll go with that for now.

* Planar spaces have origins at zero for cartesian and polar radius - non configurable
* The angular zero and direction is still yet to be properly configured though
* I'll leave the space reference **in** for point instances - feel like i might still need it
* Clients can handle spatial arthmetic (addition/multiplication) but we'll help out by doing the basic trig in the space
* I should be be able to defer more of the point methods back to `static` Space methods now that zero is fixed


Break up SVGTurtle
------------------

Really need to do this - too many methods calls bouncing between super and sub and making things confusing.

As mentioned above, need something like a wrapper or renderer object.
I've started doing a little and I need a way to split up commands depending on how they're to be processed.

These commands are SVG only, they currently have no actual effect on the turtle's position (though versions of some conceivably could):
* circle
* ellipse
* rect
* text
* marker

The others are turtle commands that usually draw lines:
* bear
* jump
* left
* right
* move
* origin

Probably it should work something like:
* SVGTurtle takes command, records current turtle position
* If a known Turtle command send it to turtle, get new position
* If a known SVGTurtle command send to renderer method
* return result



SVG & Conventional units
------------------------

Finally after a very long time in the weeds this is starting to work.

I'm going to standardise on 'conventional' orientation for the moment while I get everything running again.

For now just inverting all the y coords is working, but I'd like a way better way to do this, especially if i want to be able to flip between coord systems.


### Move & bear

Still trying to get these both working properly...
Bear is okay, but it inverts move, and vice-versa, and I need to slow down and fix this correctly instead of just farking around.

Okay cool, have whittled away a little more cruft and added some more useful debugging and think I'm just about back to where I need to be.
Move and bear are now working again in my conventional planar coordinate setup.

I've also properly parameterised the polar configuration now, but haven't tested it much yet.

Still a bunch more things to do though.


This task
---------

This has turned into a much bigger job than just getting conventional cartesian coordinates going.
I still don't know yet whether at the end of all this I'll be able to easily switch back into SVG coords (hope so), back that's taking a back seat right now.

For now, just to focus and get an actual end in site, these will be the remaining tasks:

* Update page centering
* Update axis markers for conventional coords - these will need to be dynamic eventually
* Get some of the output formatted to x number of decimals
* Make sure all drawing methods are working as before
* Do a bit of testing on the space polar parameters

If everything looks pretty much as it did before (or better), and everything now presents in conventional coordinates then I'll close it and defer further work to other tasks.







