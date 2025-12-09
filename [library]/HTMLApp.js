/* HTMLApp
*/
export class HTMLApp {

	name;
	info;

	elementMap = {};
	element = {};
	eventListeners = [];

	constructor() {
		//console.debug('HTMLApp.constructor', this);
		document.addEventListener('DOMContentLoaded', this.documentDOMContentLoaded.bind(this));
		// adding a `.bind(this)` to the addEventListener gives the listener the instance 'this'
	}


	documentDOMContentLoaded() {
		//console.log('documentDOMContentLoaded', arguments, this);
		this.element = this.buildElementMap(document, this.elementMap);
		this.addEventListeners();
		console.info(this.info);
	}/* documentDOMContentLoaded */


	addEventListeners() {
		// by default event listeners like these receive the originating element as 'this' (here HTMLDocument)
		// and the event object as argument 0
		// HTMLDocument doesn't seem all that useful as a 'this', especially in a class context
		// adding a `.bind(this)` to the addEventListener keeps 'this' as the instance scope

		// NB Might need updating for other modules/classes/components
		// Also the root node might need changing for SVG? Not sure yet.

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


	/* buildElementMap
	There are different ways this could be done.
	For instance SVG has it's own version of 'getElementById' that is sometimes needed.
	Also a query selector could be used.
	Also might need to change in type sensitive contexts.
	*/
	buildElementMap(baseElement, elementMap) {
		const result = {};
		for (let item in elementMap) {
			//console.debug(item);
			result[item] = baseElement.getElementById(elementMap[item]);
		}
		return result;
	}/* buildElementMap */


	/*
	getFormData(formElement) {
		const formData = new FormData(formElement);
		const result = Object.fromEntries(formData);
		return result;
	} */

	getFormData(formElement) {
		//console.debug('getFormData arguments', arguments);
		//console.debug('getFormData formElement.elements', formElement.elements);
		const result = {}
		let input;

		for (let i=0 ; i < formElement.elements.length; i++) {
			input = formElement.elements[i];

			if (input.name) { // need to ignore unnamed form elements like buttons

				if (input.type === 'radio') {
					//console.debug('radio', input);
					result[input.name] = formElement[input.name].value;
				}
				else if (input.type === 'checkbox')
				{
					result[input.name] = input.checked;
				}
				else
				{
					result[input.name] = input.value;
				}
			}
		}

		//console.debug('getFormData result' , result);
		return result;
	}


	populateForm(formElement, formData) {
		//console.debug('populateForm', arguments);
		for (let item in formData) {
			//console.debug(item);

			if (formElement.elements[item]) {	// don't try to populate a form field that isn't there
				if (formElement.elements[item].type === 'checkbox')
				{
					formElement.elements[item].checked = formData[item];
				}
				else
				{
					formElement.elements[item].value = formData[item];
				}
			}
		}
	}


}/* HTMLApp */