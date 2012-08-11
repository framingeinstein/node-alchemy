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
  http.get(request_query.nice, function(res) {
     var data = [];
     res
      .on('data', function(chunk) { data.push(chunk); })
      .on('end', function() {
          var urldata = data.join('').trim();
          var result;
          try {
            result = JSON.parse(urldata);
          } catch (exp) {
            result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
          }
          cb(null, result);
      });
  })
  .on('error', function(e) {
      cb(e);
  });
  /*
  if(request_query.httpMethod == "POST") {
  	post_req.write(postdata);
  	post_req.end();
  }
  */
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
    var v = new RegExp("<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)</\1>", "i");
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
	query.apimethod = "HTML" + method;
	var httpMethod = "POST";
	if(this._urlCheck(data)){
		query.apimethod = "URL" + method;
		httpMethod = "GET";
		query.url.url = data;
	} 
	else if(!this._htmlCheck(data)){
	    query.apimethod = "Text" + method;
	} 
	
	query.nice = this._generateNiceUrl(query.url, query.apimethod);
	query.nice.method = httpMethod;
	
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
	this._doRequest(this._getQuery(data, "GetAuthor"), cb);
};


Alchemy.prototype.text = function(data, cb) {
	this._doRequest(this._getQuery(data, "GetText"), cb);
};




// Export as main entry point in this module
module.exports = Alchemy;