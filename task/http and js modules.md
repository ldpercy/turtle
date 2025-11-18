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


