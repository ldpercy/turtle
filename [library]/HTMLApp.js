/* HTMLApp
*/
class HTMLApp {

	//name = 'HTMLApp';
	//info = 'HTMLApp by ldpercy';

	constructor() {
		//console.debug('HTMLApp.constructor', this);
		document.addEventListener('DOMContentLoaded', this.documentDOMContentLoaded.bind(this));
		// adding a `.bind(this)` to the addEventListener gives the listener the instance 'this'
	}


	documentDOMContentLoaded() {
		// by default event listeners like these receive the originating element as 'this' (here HTMLDocument)
		// and the event object as argument 0
		// HTMLDocument doesn't seem all that useful as a 'this', especially in a class context
		// adding a `.bind(this)` to the addEventListener keeps 'this' as the instance scope

		//console.log('documentDOMContentLoaded', arguments, this);
		this.addEventListeners();
		console.info(this.info);
	}/* documentDOMContentLoaded */



	addEventListeners() {
		//console.debug('HTMLApp.addEventListeners', arguments, instance);
		this.eventListeners.forEach(
			(item) => {
				document.querySelectorAll(item.query).forEach((node) => {
					node.addEventListener(
						item.type,
						item.listener.bind(this)
					);//addEventListener
				}); //
			}//item
		);
	}/* addEventListeners */



}/* HTMLApp */