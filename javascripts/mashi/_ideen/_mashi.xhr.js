/*
	Copyright (c) 2008-2009, Uli Preuss All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://mashi.com/license for details
*/

 (function() {

    if (typeof mashi.application.xhr == "undefined") {
        mashi.application.prototype.xhr = function() {};
        _max_ = mashi.application.prototype.xhr;
    }
    _max_.sendRequest = function(url, callback, parameter, postData) {
    	var req = createXMLHTTPObject();
    	if (!req) return;
    	var method = (postData) ? "POST" : "GET";
    	req.open(method, url, true);
    	req.overrideMimeType('text/html');
    	//req.overrideMimeType('text/plain');
    	req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    	if (postData) {
    		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    	}
    	req.onreadystatechange = function () {
    		if (req.readyState != 4) return;
    		if (req.status != 200 && req.status != 304) {
    			// alert('HTTP error ' + req.status);
    			return;
    		}
    		callback(req);
    	}
    	if (req.readyState == 4) return;
    	req.send(parameter);
      
    };
    
    _max_.createXMLHTTPObject = function() {
    	var xmlhttp = false;
      var XMLHttpFactories = [
      	function () { return new XMLHttpRequest() },
      	function () { return new ActiveXObject("Msxml2.XMLHTTP") },
      	function () { return new ActiveXObject("Msxml3.XMLHTTP") },
      	function () { return new ActiveXObject("Microsoft.XMLHTTP") } 
      ];
    	for (var i=0;i<XMLHttpFactories.length;i++) {
    		try { xmlhttp = XMLHttpFactories[i](); }
    		catch (e) { continue; }
    		break;
    	}
    	return xmlhttp;
    };
    
    _max_.handleRequest = function(req) {
      if (/Sorry/.test(req)) { 
    	  // do somethong
    	} 
    };

    function sendDataViaAlax() {
    	var poststr = "fm_name=" + encodeURI( $("fm_name").value );
    	poststr+= "&fm_email=" + encodeURI( $("fm_email").value );
    	poststr+= "&fm_message=" + encodeURI( $("fm_message").value );

    	sendRequest('contact.php', handleRequest, poststr, 'POST');
    }

})();

