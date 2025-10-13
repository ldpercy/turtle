Add dark theme
==============

To save my eyes while coding in the evening.





HTMLApp
-------

I've converted the main page script over to become an HTMLApp, a little class I'm experimenting with to organise some common features such as event registration.

Still really early days so will see how it pans out, but has some advantages like not polluting the global namespace.

Registering event functions inside the instance requires a couple of tricks though:
```js
{
	query: '#input-do',
	type: 'click',
	listener: ()=>this.doCommands
},
```
I haven't figured out yet how to do this raw, ie `listener: this.doCommands`.
I faced the same issue in year-clock and this was the only way that seemed to work... will keep experimenting.
Like this you have to evaluate the function to get the actual listener though.
```js
listenerFunction.bind(this)
```
By default event listeners receive the originating element as 'this' which isn't all that useful a lot of the time.
For now I'm binding the listener 'this' to the instance 'this' which makes things easier in a class context.
However i can think of cases where the element is needed - I'm using it in year-clock for example - so might have to have an alternate solution for those.
I could probably create a synonym for 'this' for listeners to use, but would require separating listeners and handler functions.

As I say, early days so open to improvements.




Colour scheme
-------------

I have a quick knocked together light-dark switcher going, but there are some immediate problems which will require a bit more research.

Main thing are browser-native widgets like buttons, textareas, checkboxes etc.

I need to see if there's a way to manually switch into the browser's dark/light modes as well so I can use its dark widget styles.

