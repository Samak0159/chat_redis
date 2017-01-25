/*
cmd : redis-cli in 2 terminals

Terminal 1 : 
	subscribe [test]
Terminal 2 : 
	publish [test] [message]
*/

var Redis = require('ioredis');
var redis = new Redis();
var pub = new Redis();
var channelNews = "news";

//Subscibe
redis.subscribe( channelNews );

//listener
redis.on( 'message' , function ( channel , message, source ) {
	console.log('Receive message "%s" from channel %s', message, channel);
});

var stdin = process.stdin;

//publish the message written on the terminal
stdin.on( 'data' , function ( data ) {
	var message = data.toString().trim();

	pub.publish( channelNews , message );
});