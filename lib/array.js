'use strict';

// MODULES //

var ISFIN = require( './number.js' );

// ISFINITE //

/**
* FUNCTION: isfinite( out, arr )
*	Computes for each array element whether it is a finite number.
*
* @private
* @param {Array} out - output array
* @param {Array} arr - input array
* @returns {Array} output array
*/
function isfinite( y, x ) {
	var len = x.length,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		y[ i ] = ISFIN( x[ i ] );
	}

	return y;
} // end FUNCTION isfinite()


// EXPORTS //

module.exports = isfinite;
