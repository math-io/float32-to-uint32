'use strict';

var float64ToFloat32 = require( 'float64-to-float32' );
var toWord = require( './../lib' );

var word;
var f64;
var f32;
var i;

// Convert single-precision floating-point numbers to integers representing the binary literal...
for ( i = 0; i < 1000; i++ ) {
	f64 = Math.random()*100 - 50;
	f32 = float64ToFloat32( f64 );
	word = toWord( f32 );
	console.log( 'float64: %d => float32: %d => word: %d', f64, f32, word );
}