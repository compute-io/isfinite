/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	isfinite = require( './../lib' ),

	// Checks whether value is infinite:
	ISFIN = require( './../lib/number.js' ),

	// Cast arrays to a different data type
	cast = require( 'compute-cast-arrays' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-isfinite', function tests() {

	it( 'should export a function', function test() {
		expect( isfinite ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither a number or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			NaN,
			null,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				isfinite( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid accessor option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				isfinite( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should compute whether a provided number is finite', function test() {
		assert.strictEqual( isfinite( Infinity ), 0 );
		assert.strictEqual( isfinite( 53 ), 1 );
	});

	it( 'should compute whether each array element is a finite number when provided a plain array', function test() {
		var data, actual, expected;

		data = [ Infinity, -Infinity, 39, -30, 233, null, NaN, true, {} ];

		expected = [ 0, 0, 1, 1, 1, 0, 0, 0, 0];

		actual = isfinite( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = isfinite( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should evaluate the isfinite function when provided a typed array', function test() {
		var data, actual, expected;

		data = new Float64Array(  [ Infinity, -Infinity, 39, -30, 233 ] );

		expected = new Uint8Array( [ 0, 0, 1, 1, 1] );

		actual = isfinite( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = isfinite( data, {
			'copy': false
		});
		expected = new Int32Array( [ 0, 0, 1, 1, 1] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, cast( expected, 'float64') );

	});

	it( 'should evaluate the isfinite function element-wise using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,Infinity],
			[1,-Infinity],
			[2,39],
			[3,-30],
			[4,233],
			[5,null],
			[6,NaN],
			[7,true],
			[8,{}],
		];

		expected = [ 0, 0, 1, 1, 1, 0, 0, 0, 0];

		actual = isfinite( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = isfinite( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the isfinite function element-wise when provided a matrix', function test() {
		var mat,
			out,
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
		mat = matrix( d1, [10,10], 'float64' );
		out = isfinite( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = isfinite( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );

		assert.deepEqual( mat.data, cast( d2, 'float64' ) );
	});

	it( 'should return `null` if provided an empty data structure', function test() {
		assert.isNull( isfinite( [] ) );
		assert.isNull( isfinite( matrix( [0,0] ) ) );
		assert.isNull( isfinite( new Int8Array() ) );
	});

});
