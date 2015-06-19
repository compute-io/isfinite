/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isfinite = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor isfinite', function tests() {

	it( 'should export a function', function test() {
		expect( isfinite ).to.be.a( 'function' );
	});

	it( 'should compute whether each array element is a finite number using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':394},
			{'x':Infinity},
			{'x':-Infinity},
			{'x':-392},
			{'x':Number.POSITIVE_INFINITY},
			{'x':Number.NEGATIVE_INFINITY,},
			{'x':40},
			{'x':null},
			{'x':NaN},
			{'x':false},
			{'x':{}}
		];

		actual = new Array( data.length );
		actual = isfinite( actual, data, getValue );

		expected = [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0 ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( isfinite( [], [], getValue ) );
		function getValue( d ) {
			return d.x;
		}
	});

});
