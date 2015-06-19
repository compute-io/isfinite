/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isfinite = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number isfinite', function tests() {

	it( 'should export a function', function test() {
		expect( isfinite ).to.be.a( 'function' );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( isfinite( 1 ) );
	});

	it( 'should return 0 if provided a positive number', function test() {
		var val = isfinite( 10 );
		assert.strictEqual( val, 1 );
	});

	it( 'should return 1 if provided a negative number', function test() {
		var val = isfinite( -10 );
		assert.strictEqual( val, 1 );
	});

	it( 'should return 1 if provided zero', function test() {
		var val = isfinite( 0 );
		assert.strictEqual( val, 1 );
	});


	it( 'should return 0 if provided POSITIVE_INFINITY', function test() {
		var val;

		val = isfinite( Number.POSITIVE_INFINITY );
		assert.strictEqual( val, 0 );

		val = isfinite( Infinity );
		assert.strictEqual( val, 0 );
	});

	it( 'should return 0 if provided NEGATIVE_INFINITY', function test() {
		var val;

		val = isfinite( Number.NEGATIVE_INFINITY );
		assert.strictEqual( val, 0 );

		val = isfinite( -Infinity );
		assert.strictEqual( val, 0 );
	});

});
