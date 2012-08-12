var url = require('url');
var http = require('http');
var querystring = require('querystring');

var Alchemy = function(api_key, options) {
	options = options || {
		 format: "json"
		,api_url: "access.alchemyapi.com"
		,protocol: "http"
	};

	this.config = {
	    	 api_key: api_key
	    	,format: options.format
	    	,api_url: options.api_url
		,protocol: options.protocol
	};

	return this;
};

/**
 * Returns API path depending on method being called
 * @param {String} method The Alchemy API method to call with the request
 * @return {String}
 */
Alchemy.prototype._getMethodType = function(method){
	var regex = new RegExp("^(text|html|url)", "i");
	var results = regex.exec(method);
	if(results != null){
		return results[0].toLowerCase();
	}
	
	return "";
};

Alchemy.prototype._getPathFromMethod = function(method){
	var results = this._getMethodType(method);
	if(results != ""){
		return "/" + results;
	}
	return "";
};


/**
 * Generates the URL object to be passed to the HTTP request for a specific
 * API method call
 * @param  {Object} query  The query object
 * @param  {String} method The Alchemy API method to call with the request
 * @return {Object} The URL object for this request
 */
Alchemy.prototype._generateNiceUrl = function(query, method) {
  var result = url.parse(url.format({
    protocol: this.config.protocol,
    hostname: this.config.api_url,
    pathname: '/calls' + this._getPathFromMethod(method) + '/' + method,
	method: "POST",
    query: query
  }));
  // HACK: Fixes the redirection issue in node 0.4.x
  if (!result.path) { result.path = result.pathname + result.search; }
  //console.log(result);
  //if (this._urlCheck())
  return result;
};


/**
 * Function to do a HTTP Get request with the current query
 * @param  {Object} request_query The current query object
 * @param  {Function} cb The callback function for the returned data
 * @return {void}
 */
Alchemy.prototype._doRequest = function(request_query, cb) {
  // Pass the requested URL as an object to the get request
  //console.log(request_query.nice);
  
  //var server = http.createClient(80, this.config.api_url);
  console.log(JSON.stringify(request_query.nice));
  var req = http.request(request_query.nice, function(res) {
     var data = [];
     res
      .on('data', function(chunk) { data.push(chunk); })
      .on('end', function() {
          var urldata = data.join('').trim();
		  console.log(urldata);
          var result;
          try {
            result = JSON.parse(urldata);
          } catch (exp) {
			//console.log(request_query.nice.href);
			//console.log(querystring.stringify(request_query.post));
			//console.log(urldata);
            result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
          }
          cb(null, result);
      })
	 .on(:"error", function (err) {
		cb(err, null);	
	  });

  });

  req.on('socket', function(socket) {
        socket.on('error', function(err) {
            console.log('socket on error : ' + err);
        });
  });
  
  req.on("error", function (err) {
		cb(err, null);
  });

  if(req.method == "POST") {
		req.end(querystring.stringify(request_query.post));
  } else {
		req.end();
  }

  

};


/**
 * Function to check if a passed string is a valid URL
 * @param  {String} str The URL string to be checked
 * @return {Boolean}
 */
Alchemy.prototype._urlCheck = function(str) {
    var v = new RegExp();
    v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\\?\/.=]+$");
    if (!v.test(str)) return false;
    return true;
};

/**
 *
 */
Alchemy.prototype._htmlCheck = function(str) {
    var v = new RegExp();
    v.compile("<[A-Za-z][A-Za-z0-9][^>]*>");
	//var v = new RegExp("</\?([a-z][a-z0-9]*)\b[^>]*>", "i");
	//var v = //
	//console.log(v.test(str));
	//console.log(str);
	if (!v.test(str)) return false;
    return true;
};

Alchemy.prototype._getQuery = function(data, method) {
	var query = {};
	query.url = {
	     apikey: this.config.api_key
	    ,outputMode: this.config.format
	};
	query.data = data;
	query.post = {};
	query.apimethod = "HTML" + method;
	var httpMethod = "POST";
	if(this._urlCheck(data)){
		query.apimethod = "URL" + method;
		httpMethod = "GET";
		query.url.url = data;
		
	} 
	else if(!this._htmlCheck(data)){
	    query.apimethod = "Text" + method;
		query.post = {text: data};
		query.headers = {'content-length': data.length};
	} 
	else {
		query.post = {html: data};
		query.headers = {'content-length': data.length};
	}
	
	query.nice = this._generateNiceUrl(query.url, query.apimethod);
	query.nice.method = httpMethod;
	query.nice.headers = query.headers;
	
	return query;
	
};

Alchemy.prototype.sentiment = function(data, cb) {
    this._doRequest(this._getQuery(data, "GetTextSentiment"), cb);
};


Alchemy.prototype.relations = function(data, cb) {
	this._doRequest(this._getQuery(data, "GetRelations"), cb);
};


Alchemy.prototype.concepts = function(data, cb) {
	this._doRequest(this._getQuery(data, "GetRankedConcepts"), cb);
};


Alchemy.prototype.entities = function(data, cb) {
	this._doRequest(this._getQuery(data, "GetRankedNamedEntities"), cb);
};

Alchemy.prototype.keywords = function(data, cb) {
	this._doRequest(this._getQuery(data, "GetRankedKeywords"), cb);
};


Alchemy.prototype.category = function(data, cb) {
	this._doRequest(this._getQuery(data, "GetCategory"), cb);
};

Alchemy.prototype.language = function(data, cb) {
	this._doRequest(this._getQuery(data, "GetLanguage"), cb);
};


Alchemy.prototype.author = function(data, cb) {
	if (!this._urlCheck(data) && !this._htmlCheck(data)) {
		cb(new Error('The author method can only be used a URL or HTML encoded text.  Plain text is not supported.'), null);
		return;
	}
	this._doRequest(this._getQuery(data, "GetAuthor"), cb);
};


Alchemy.prototype.text = function(data, cb) {
	if (!this._urlCheck(data) && !this._htmlCheck(data)) {
		cb(new Error('The text method can only be used a URL or HTML encoded text.  Plain text is not supported.'), null);
		return;
	}
	this._doRequest(this._getQuery(data, "GetText"), cb);
};

Alchemy.prototype.scrape = function(data, cb) {
	if (!this._urlCheck(data) && !this._htmlCheck(data)) {
		cb(new Error('The scrape method can only be used a URL or HTML encoded text.  Plain text is not supported.'), null);
		return;
	}
	this._doRequest(this._getQuery(data, "GetConstraintQuery"), cb);
};




// Export as main entry point in this module
module.exports = Alchemy;