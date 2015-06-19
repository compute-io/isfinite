'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );

// VARIABLES //

var pinf = Number.POSITIVE_INFINITY,
	ninf = Number.NEGATIVE_INFINITY;


// IS INF //

/**
* FUNCTION: isfinite( x )
*	Checks whether input element is a finite number.
*
* @private
* @param {Number} x - input value
* @returns {Number} 1 if element is a finite number, 0 otherwise
*/
function isfinite( x ) {
	return ( isNumber( x ) === true && x < pinf && x > ninf  ) ? 1 : 0;
} // end FUNCTION isfinite()

// EXPORTS //

module.exports = isfinite;
