Settings in localStorage
========================


Add more settings to localStorage.

```
2025-10-22		New Task
```


Ideas:
* Create a settings structure for the command box, page and drawing settings
* Save the settings when the page visibility changes (~unload)
* Load the settings on page load
* Possibly have separate light and dark mode settings for the grids, colour and stroke width
* Multiple command buffers - be able to switch between a few command sets (also saved)



visibilitychange & formdata
---------------------------

Have added a `visibilitychange` listener that now saves info from the page and drawing forms.

The transition to hidden is the modern equivalent of the unload event.

The internet suggested creating a FormData object directly out of the forms and serialising that, so trying that now.
Not used FormData before, think it's part of XHR.

Something weird was happening with it yesterday, it was including the prototype, not doing it now though, not sure why.

Unfortunately I don't think there's an easy reverse equivalent for populating a form from some data, but writing one will be quick.



HTMLApp buildElements
---------------------

I've added a buildElements method to the HTMLApp to set up references for commonly reused elements so document.getElementById('foo') doesn't have to be called all the time.
I don't know if this actually saves much other than some visual clutter, but will try it out for a while.
It might prove more more confusing in some ways because i have to maintain two sets of names, will see.



Saving and reloading form data
------------------------------

Hmm there's a few complications with FormData - they were some noted on the SO page i was referencing, need to review.

> https://stackoverflow.com/a/55874235

For one thing, unchecked checkboxes don't get included - I'd prefer they were.



	formData = new FormData(formElement);
	formDataObject = Object.fromEntries(formData),
