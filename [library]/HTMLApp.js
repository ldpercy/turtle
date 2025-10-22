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
		this.eventListeners.forEach(
			(item) => {
				if (item.element) {
					item.element.addEventListener(
						item.type,
						item.listener.bind(this)
					);
				} else if (item.query) {
					document.querySelectorAll(item.query).forEach((node) => {
						//console.debug('HTMLApp.addEventListeners item.listener', item.listener);
						node.addEventListener(
							item.type,
							item.listener.bind(this)
						);//addEventListener
					});
				}
			}//item
		);
	}/* addEventListeners */



}/* HTMLApp */