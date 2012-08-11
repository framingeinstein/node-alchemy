var Alchemy = require('../');
var testURL = "http://www.inspirational-quotes.info/success-quotes.html";
var apikey = "fcb11f5cebca4850ae9771ed0678ae4222d5733e";
module.exports = {
	'get sentiment from URL': function(test) {
		var alchemy = new Alchemy(apikey);
	    alchemy.sentiment(testURL, function(error, result) {
			test.ifError(error);
			test.deepEqual(result.status, "OK");
			test.done();
	    });
	},
	'get relations from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.relations(testURL, function(error, result) {
			test.ifError(error);
			test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get concepts from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.concepts(testURL, function(error, result) {
			test.ifError(error);
			test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get entities from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.entities(testURL, function(error, result) {
			test.ifError(error);
			test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get keywords from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.keywords(testURL, function(error, result) {
			test.ifError(error);
			test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get category from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.category(testURL, function(error, result) {
			test.ifError(error);
			test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get language from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.language(testURL, function(error, result) {
			test.ifError(error);
			test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get author from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.author(testURL, function(error, result) {
			//console.log(result);
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'scrape text from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.scrape(testURL, function(error, result) {
			//console.log(result);
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 }

};