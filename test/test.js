'use strict';

// MODULES //

var tape = require( 'tape' );
var ninf = require( 'const-ninf-float32' );
var pinf = require( 'const-pinf-float32' );
var repeat = require( 'utils-repeat-string' );
var rpad = require( 'utils-right-pad-string' );
var toWord = require( './../lib' );


// FIXTURES //

var negativeLarge = require( './fixtures/negative_large.json' );
var negativeNormal = require( './fixtures/negative_normal.json' );
var negativeSmall = require( './fixtures/negative_small.json' );
var negativeSubnormal = require( './fixtures/negative_subnormal.json' );
var negativeTiny = require( './fixtures/negative_tiny.json' );
var positiveLarge = require( './fixtures/positive_large.json' );
var positiveNormal = require( './fixtures/positive_normal.json' );
var positiveSmall = require( './fixtures/positive_small.json' );
var positiveSubnormal = require( './fixtures/positive_subnormal.json' );
var positiveTiny = require( './fixtures/positive_tiny.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof toWord === 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `0`, the function returns an unsigned 32-bit integer representing the underlying IEEE 754 bit sequence', function test( t ) {
	var uint32;
	var word;
	var sign;
	var frac;
	var exp;
	var w;

	sign = '0';
	exp = repeat( '0', 8 ); // all 0s
	frac = repeat( '0', 23 ); // all 0s
	w = sign + exp + frac;

	uint32 = parseInt( w, 2 );

	word = toWord( 0 );
	
	t.equal( word, uint32, 'equals '+w );
	t.end();
});

tape( 'if provided `-0`, the function returns an unsigned 32-bit integer representing the underlying IEEE 754 bit sequence', function test( t ) {
	var uint32;
	var word;
	var sign;
	var frac;
	var exp;
	var w;

	sign = '1';
	exp = repeat( '0', 8 ); // all 0s
	frac = repeat( '0', 23 ); // all 0s
	w = sign + exp + frac;

	uint32 = parseInt( w, 2 );

	word = toWord( -0 );
	
	t.equal( word, uint32, 'equals '+w );
	t.end();
});

tape( 'if provided `+infinity`, the function returns an unsigned 32-bit integer representing the underlying IEEE 754 bit sequence', function test( t ) {
	var uint32;
	var word;
	var sign;
	var frac;
	var exp;
	var w;

	sign = '0';
	exp = repeat( '1', 8 ); // all 1s
	frac = repeat( '0', 23 ); // all 0s
	w = sign + exp + frac;

	uint32 = parseInt( w, 2 );

	word = toWord( pinf );
	
	t.equal( word, uint32, 'equals '+w );
	t.end();
});

tape( 'if provided `-infinity`, the function returns an unsigned 32-bit integer representing the underlying IEEE 754 bit sequence', function test( t ) {
	var uint32;
	var word;
	var sign;
	var frac;
	var exp;
	var w;

	sign = '1';
	exp = repeat( '1', 8 ); // all 1s
	frac = repeat( '0', 23 ); // all 0s
	w = sign + exp + frac;

	uint32 = parseInt( w, 2 );

	word = toWord( ninf );
	
	t.equal( word, uint32, 'equals '+w );
	t.end();
});

tape( 'if provided `NaN`, the function returns an unsigned 32-bit integer representing the underlying IEEE 754 bit sequence', function test( t ) {
	var uint32;
	var word;
	var sign;
	var frac;
	var exp;
	var w;

	sign = '0';
	exp = repeat( '1', 8 ); // all 1s
	frac = rpad( '1', 23, '0' ); // not all 0s
	w = sign + exp + frac;

	uint32 = parseInt( w, 2 );

	word = toWord( NaN );
	
	t.equal( word, uint32, 'equals '+w );
	t.end();
});

tape( 'if provided large positive values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = positiveLarge.x;
	expected = positiveLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided normal positive values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = positiveNormal.x;
	expected = positiveNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided small positive values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = positiveSmall.x;
	expected = positiveSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided tiny positive values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = positiveTiny.x;
	expected = positiveTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided subnormal positive values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = positiveSubnormal.x;
	expected = positiveSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided large negative values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = negativeLarge.x;
	expected = negativeLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided normal negative values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = negativeNormal.x;
	expected = negativeNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided small negative values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = negativeSmall.x;
	expected = negativeSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided tiny negative values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = negativeTiny.x;
	expected = negativeTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});

tape( 'if provided subnormal negative values, the function returns unsigned 32-bit integers representing the underlying IEEE 754 bit sequences', function test( t ) {
	var expected;
	var x;
	var y;
	var w;
	var i;

	x = negativeSubnormal.x;
	expected = negativeSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = toWord( x[ i ] );
		w = parseInt( expected[ i ], 2 );
		t.equal( y, w, 'x: '+x[i]+', y: '+y+', expected: '+w );
	}
	t.end();
});