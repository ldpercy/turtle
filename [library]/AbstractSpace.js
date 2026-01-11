//
//	AbstractSpace
//


// not sure if should be base class or interface...

export class Space {

	/** @type string */
	#name;

	constructor(name) {
		this.#name = name;
	}

}