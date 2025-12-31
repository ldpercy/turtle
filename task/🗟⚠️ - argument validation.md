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






