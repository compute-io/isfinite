'use strict';

// MODULES //

var	isArray = require( 'validate.io-array' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isNumber = require( 'validate.io-number-primitive' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );

// FUNCTIONS //

var isfinite1 = require( './number.js' ),
	isfinite2 = require( './array.js' ),
	isfinite3 = require( './accessor.js' ),
	isfinite4 = require( './matrix.js' );

// IS EVEN //

/**
* FUNCTION: isfinite( x[, opts] )
*	Computes for each element whether it is a finite number.
*
* @param {Number|Number[]|Array} x - input value
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix|Null} 1s and 0s indicating if elements are finite numbers or null
*/
function isfinite( x, options ) {

	var opts = {},
		err,
		out;

	if ( isNumber( x ) ) {
		return isfinite1( x );
	}

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( isMatrixLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		}
		else {
			out = matrix( x.shape, 'uint8' );
		}
		out = isfinite4( out, x );
		return out;
	}

	if ( isArrayLike( x ) ) {

		if ( opts.copy === false ) {
			out = x;
		}
		else if ( !isArray( x ) ) {
			out = new Uint8Array( x.length );
		}  else {
			out = new Array( x.length );
		}
 		if ( opts.accessor ) {
			out = isfinite3( out, x, opts.accessor );
		}
		else {
			out = isfinite2( out, x );
		}
		return out;
	}

	throw new TypeError( 'isfinite()::invalid input argument. Input value type not currently supported. Value: `' + x + '`.' );

} // end FUNCTION isfinite()


// EXPORTS //

module.exports = isfinite;
