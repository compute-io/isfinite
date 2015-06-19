'use strict';

// MODULES //

var ISFIN = require( './number.js' );

// ISFINITE //

/**
* FUNCTION: isfinite( out, arr, accessor )
*	Computes for each array element whether it is a finite number using an accessor function.
*
* @private
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Array} output array
*/
function isfinite( y, x, clbk ) {
	var len = x.length,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		y[ i ] = ISFIN( clbk( x[ i ], i ) );
	}

	return y;
} // end FUNCTION isfinite()


// EXPORTS //

module.exports = isfinite;
