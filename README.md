[![Build Status](https://secure.travis-ci.org/framingeinstein/node-alchemy.png)](http://travis-ci.org/framingeinstein/node-alchemy) node-alchemy - An Alchemy API library for Node.JS
====================

This module provides calls to the [Alchemy](http://www.alchemyapi.com/) API for [Nodejs](http://nodejs.org).
For more information on the API request and responses visit the [Alchemy API docs](http://www.alchemyapi.com/api/)

Installation
------------
To install via NPM type the following: `npm install alchemy-api`

You can also install via git by cloning: `git clone https://github.com/framingeinstein/node-alchemy.git /path/to/alchemy-api`

Usage
-----
    var AlchemyAPI = require('alchemy-api');
    var alchemy = new AlchemyAPI('<YOUR API KEY>');
    alchemy.sentiment('<URL|HTML|TEXT>', {}, function(err, response) {
      if (err) throw err;

      // See http://www.alchemyapi.com/api/ for format of returned object
      var sentiment = response.docSentiment;

      // Do something with data
    });

Tests
-----
To run tests type `npm test`

AlchemyAPI Features
---------------
This module does NOT support the optional parameters of the Alchemy API methods.  There is an options argument that will be utilized to enable these features in the future.

*Named Entity Extraction
-----------------------
 	var AlchemyAPI = require('alchemy-api');
    var alchemy = new AlchemyAPI('<YOUR API KEY>');
    alchemy.entities('<URL|HTML|TEXT>', {}, function(err, response) {
      if (err) throw err;

      // See http://www.alchemyapi.com/api/ for format of returned object
      var entities = response.entities;

      // Do something with data
    });

*Sentiment Analysis
-------------------
    var AlchemyAPI = require('alchemy-api');
    var alchemy = new AlchemyAPI('<YOUR API KEY>');
    alchemy.sentiment('<URL|HTML|TEXT>', {}, function(err, response) {
      if (err) throw err;

      // See http://www.alchemyapi.com/api/ for format of returned object
      var sentiment = response.docSentiment;

      // Do something with data
    });
