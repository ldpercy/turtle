/* HTMLApp
*/
class HTMLApp {

	//name = 'HTMLApp';
	//info = 'HTMLApp by ldpercy';

	element = {};
	eventListeners = [];

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
		this.buildElements();
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


	buildElements() {
		for (let item in this.element) {
			//console.debug(item);
			this.element[item] = document.getElementById(this.element[item]);
		}
	}/* buildElements */



	getFormData(formElement) {
		const formData = new FormData(formElement);
		const result = Object.fromEntries(formData);

		return result;
	}

	getFormData2(formElement) {
		//console.debug('getFormData2 arguments', arguments);
		//console.debug('getFormData2 formElement.elements', formElement.elements);
		const result = {}
		let input;

		for (let i=0 ; i < formElement.elements.length; i++) {
			input = formElement.elements[i];

			if (input.type === 'checkbox')
			{
				result[input.name] = input.checked;
			}
			else
			{
				result[input.name] = input.value;
			}
		}

		console.debug('getFormData2 result' , result);
		return result;
	}


	populateForm(formElement, formData) {

	}


}/* HTMLApp */