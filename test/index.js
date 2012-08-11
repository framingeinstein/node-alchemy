var Alchemy = require('../');

module.exports = {
	'get sentiment from URL': function(test) {
		var alchemy = new Alchemy("fcb11f5cebca4850ae9771ed0678ae4222d5733e");
	    alchemy.sentiment('http://www.inspirational-quotes.info/success-quotes.html', function(error, result) {
			test.ifError(error);
			console.log(result);
			test.deepEqual(result.status, "OK");
			console.log(result.docSentiment);
			test.done();
	    });
	  }
};