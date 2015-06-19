/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	isfinite = require( './../lib/matrix.js' ),

	// Checks whether value is infinite:
	ISFIN = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix isfinite', function tests() {

	var out,
		mat,
		d1,
		d2,
		rand,
		i;

	d1 = new Float64Array( 100 );
	d2 = new Uint8Array( 100 );
	for ( i = 0; i < d1.length; i++ ) {
		rand = Math.random()*10 - 10;
		if ( rand < -4.5 ) {
			rand = 0;
		}
		d1[ i ] = 100 / rand;
		d2[ i ] = ISFIN( d1[ i ] );
	}

	beforeEach( function before() {
		mat = matrix( d1, [10,10], 'float64' );
		out = matrix( d2, [10,10], 'uint8' );
	});

	it( 'should export a function', function test() {
		expect( isfinite ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			isfinite( matrix( [5,5] ), mat );
		}
	});

	it( 'should compute whether each matrix element is a finite number', function test() {
		var actual;

		actual = matrix( [10,10], 'uint8' );
		actual = isfinite( actual, mat );

		assert.deepEqual( actual.data, out.data );

	});

	it( 'should return null if provided an empty matrix', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( isfinite( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( isfinite( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( isfinite( out, mat ) );
	});

});
