
var iframeLoad = function(pageURL, cb){

	var iframe = document.createElement('iframe');

	iframe.onload = function(event) {

		// Create flag in iframe for testing environment.
		iframe.contentWindow.isQunit = true;

		// Return iframe to callback.
		iframe.contentWindow.runQunit = function(){
			cb(iframe);
		};

	};

	iframe.src = pageURL;
	document.body.appendChild(iframe);

}

var iframeUnload = function(iframe){

	document.body.removeChild(iframe);

}