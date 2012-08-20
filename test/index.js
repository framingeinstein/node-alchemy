var Alchemy = require('../');

var testURL = "http://www.nytimes.com/";

var testHTML = '<html><head><title>Alchemy Test HTML</title><meta name="author" content="Jason Morgan" /></head><body><h1>Alchemy Test HTML</h1><p>This is something I am writing about.  I have to write this as I do not feel like getting it from the web.  So here it is.  A bunch of text to test the API with</p><div class="geo">GEO: <span class="latitude">37.386013</span>, <span class="longitude">-122.082932</span></div></body></html>';

var testText ="This is something I am writing about.  I have to write this as I do not feel like getting it from the web.  So here it is.  A bunch of text to test the API with";
			  //fcb11f5cebca4850ae9771ed0678ae4222d5733e
var apikey = "fcb11f5cebca4850ae9771ed0678ae4222d5733e";

module.exports = {
	
	'check html match': function(test) {
			var alchemy = new Alchemy(apikey);
		    var result = alchemy._htmlCheck(testHTML);
			test.deepEqual(result, true);
			test.done();
		    
	},
	
	'get sentiment from URL': function(test) {
		var alchemy = new Alchemy(apikey);
	    alchemy.sentiment(testURL, {}, function(error, result) {
			test.ifError(error);
			//console.log(result.docSentiment);
			//test.deepEqual(result.status, "OK");
			test.done();
	    });
	},
	
	'get relations from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.relations(testURL, {sentiment: 1}, function(error, result) {
			console.log(result);
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		 });
	 }/*,
	
	'get concepts from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.concepts(testURL, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get entities from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.entities(testURL, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get keywords from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.keywords(testURL, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get category from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.category(testURL, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get language from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.language(testURL, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get author from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.author(testURL, {}, function(error, result) {
			//console.log(result);
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'scrape text from URL': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.scrape(testURL, {}, function(error, result) {
			//console.log(result);
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	
	//Tests for HTML content post to Alchemy
	
	
	'get sentiment from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
	    alchemy.sentiment(testHTML, {}, function(error, result) {
			test.ifError(error);
			//console.log(result);
			//test.deepEqual(result.status, "OK");
			test.done();
	    });
	},
	
	'get relations from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.relations(testHTML, {}, function(error, result) {
			
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get concepts from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.concepts(testHTML, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get entities from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.entities(testHTML, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		 });
	 },
	'get keywords from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.keywords(testHTML, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get category from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.category(testHTML, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get language from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.language(testHTML, {}, function(error, result) {
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'get author from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.author(testHTML, {}, function(error, result) {
			//console.log(result);
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },
	'scrape text from HTML': function(test) {
		var alchemy = new Alchemy(apikey);
		alchemy.scrape(testHTML, {}, function(error, result) {
			//console.log(result);
			test.ifError(error);
			//test.deepEqual(result.status, "OK");
			test.done();
		});
	 },

		//Tests for HTML content post to Alchemy
		
		'get sentiment from Text': function(test) {
			var alchemy = new Alchemy(apikey);
		    alchemy.sentiment(testText, {}, function(error, result) {
				test.ifError(error);
				//console.log(result);
				//test.deepEqual(result.status, "OK");
				test.done();
		    });
		},
		'get relations from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.relations(testText, {}, function(error, result) {
				test.ifError(error);
				//test.deepEqual(result.status, "OK");
				test.done();
			 });
		 },
		'get concepts from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.concepts(testText, {}, function(error, result) {
				test.ifError(error);
				//test.deepEqual(result.status, "OK");
				test.done();
			 });
		 },
		'get entities from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.entities(testText, {}, function(error, result) {
				test.ifError(error);
				//test.deepEqual(result.status, "OK");
				test.done();
			 });
		 },
		'get keywords from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.keywords(testText, {}, function(error, result) {
				test.ifError(error);
				//test.deepEqual(result.status, "OK");
				test.done();
			});
		 },
		'get category from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.category(testText, {}, function(error, result) {
				test.ifError(error);
				//test.deepEqual(result.status, "OK");
				test.done();
			});
		 },
		'get language from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.language(testText, {}, function(error, result) {
				test.ifError(error);
				//test.deepEqual(result.status, "OK"); 
				test.done();
			});
		 },
		'get author from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.author(testText, {}, function(error, result) {
				//console.log(error);
				test.ok(error != null);
				//test.deepEqual(result.status, "OK");
				test.done();
			});
		 },
		'scrape text from Text': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.scrape(testText, {}, function(error, result) {
				//console.log(error);
				test.ok(error != null);
				//test.deepEqual(result.status, "OK");
				test.done();
			});
		 },
		'get microformats from HTML': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.microformats(testHTML, {}, function(error, result) {
				//console.log(result);
				test.ifError(error);
				//test.deepEqual(result.status, "OK");
				test.done();
			});
		 },
		'get microformats from URL': function(test) {
			var alchemy = new Alchemy(apikey);
			alchemy.microformats("http://microformats.org/wiki/geo", {}, function(error, result) {
				//console.log(result);
				test.ifError(error);
				//test.deepEqual(result.status, "OK");
				test.done();
			});
		 }	
		*/
};