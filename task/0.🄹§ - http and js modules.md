HTTP and JS modules
===================

```
2025-11-18		Start 🄹§
```



Probably do this one before year-clock, as it's smaller and more contained, and the code is generally in a better state.

I'm not sure yet how much of my class-based code will look strange in the module-based world.
A certain amount of it was kind of a workaround for creating namespaces, but some is still legit i think.



First ideas
-----------

Add a warning to myself if loaded with `file://`


Not really sure yet what should be the entry point for everything, I guess it will be `turtleApp.js`.

At this point I'm bumping myself back down to the noob zone, so will just start hacking and see what happens.


### Hard refreshes

The hard refreshes are going to get tedious real quick - need a cache breaker.

Also, hard refresh seems to ignore or reset my localStorage???? Do not like...

So yeah really need a way to get fresh resources each time, but leave the storage alone.

* in the code with url params - no idea if that works for modules
* http server setting for document age
* browser page settings?
* something else?

Ah snap - there's a disable cache checkbox in ff developer tools.
In chrome the equiv is: Settings -> Network -> Disable cache while DevTools is open
Sorted, whew.



First draft working
-------------------

For the first draft I've taken out the all the script tags for the libraries from index.html, and added `type="module"` to the `turtleApp.js` script tag.

After that I've just added exports and imports where needed and it's running as before.


### Review

If I was so inclined I could just wrap this here, but there are other changes that could be made.

In a no-module world, classes are a pretty okay way to namespace and organise things.
With modules though some of my classes become a little bit unnecessary and could be reimagined.

`Maths` for instance currently only has statics, and they're mostly not used anymore, or are going to become space concerns.
Tau is mostly a space angle or presentation concern. (I wonder if it changes in non-euclidean geometries?)
So it likely doesn't need to be a class anymore in it's current form.

The `SVG` class also is pretty empty, and not really doing anything in it's current form apart from providing a namespace.
Looking back on it now another thing that occurs to me is that some of this stuff might be actually provided by the SVG api.
The api though isn't talked about all that much on the interwebs, and I've barely used it, so I don't know much of what it provides.
I should start to look around and get familiar with it.
But for now I should consider scrapping the base SVG class, and using a module namespace instead.

The others to my mind are all still more suited to the class idea, at least for now.
It might be interesting to experiment with a non-class version of HTMLApp to see what effects it has on 'this' binding.
But not right now, I like the encapsulation it's providing.

* I've experimentally de-class-ified Maths

I have bunch of questions at this point and I'd really like to go back and run a bunch of tests in an experiment environment.
The exact nature of the things exported and imported and their namespace are still a little mysterious.
Feel like I've done some of this before a while back on-the-job, but time for a refresher.


