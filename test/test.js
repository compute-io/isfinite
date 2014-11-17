'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	isfinite = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-isfinite', function tests() {

	it( 'should export a function', function test() {
		expect( isfinite ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
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

	it( 'should compute whether each array element is a finite number', function test() {
		var data, expected, actual;

		data = [ 5, 1/0, 3, 9, -1/0, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, null, NaN ];

		expected = [ 1, 0, 1, 1, 0, 0, 0, 0, 0 ];
		actual = isfinite( data );

		assert.deepEqual( actual, expected );
	});

});
