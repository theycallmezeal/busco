const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '';
const port = 1693;

const server = http.createServer((request, result) => {
	console.log('started');
	
	result.statusCode = 200;
	result.setHeader('Content-Type', 'text/plain');

	var query = url.parse(request.url, true).query;
	var lat = query.lat;
	var lon = query.lon;

	if (lat == undefined || lon == undefined) {
		console.log('received empty request');
		sendResult(result);
		return;
	}

	console.log('received coords ' + lat + ', ' + lon);
	
	coordString = new Date().getTime() + ' ' + lat + ' ' + lon + '\n';
	fs.appendFile('coords.txt', coordString, function (appendError) {
		if (appendError) {
			throw appendError;
		}
		console.log('saved coords ' + lat + ', ' + lon);
		sendResult(result);
	});
});

function sendResult(result) {
	fs.readFile('coords.txt', 'utf-8', function(readError, data) {
		var coordArray = data.split('\n').map(x => x.split(' '));
		coordArray.pop(); /* remove the newline at the end */
		result.write(JSON.stringify(coordArray));
		result.end();
	});
}

server.listen(port, hostname, () => {
	console.log('Server running on port ' + port);
});