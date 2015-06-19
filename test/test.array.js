/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isfinite = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array isfinite', function tests() {

	it( 'should export a function', function test() {
		expect( isfinite ).to.be.a( 'function' );
	});

	it( 'should compute whether each array element is a finite number', function test() {

		var data, expected, actual;

		data = [ Infinity, -Infinity, 39, -30, 233, null, NaN, false, {} ];

		actual = new Array( data.length );
		actual = isfinite( actual, data );
		expected = [ 0, 0, 1, 1, 1, 0, 0, 0, 0 ];

		assert.deepEqual( actual, expected );

	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( isfinite( [], [] ) );
		assert.isNull( isfinite( new Int8Array(), new Int8Array() ) );
	});

});
