'use strict';

// MODULES //

var ISFIN = require( './number.js' );

// ISFINITE //

/**
* FUNCTION: isfinite( out, arr )
*	Computes for each matrix element whether it is a finite number.
*
* @private
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function isfinite( y, x ) {
	var out = y,
		len,
		i;

	len = x.length;

	if ( !len ) {
		return null;
	}
	if ( y.length !== len ) {
		throw new Error( 'isfinite()::invalid input arguments. Input and output matrices must be the same length.' );
	}

	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = ISFIN( x.data[ i ] );
	}
	return out;
} // end FUNCTION isfinite()


// EXPORTS //

module.exports = isfinite;
