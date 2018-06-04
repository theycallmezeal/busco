var errorMessage = document.getElementById('error-message');

function initMap() {
	var request = new XMLHttpRequest();
	request.open('GET', 'http://10.128.128.81:1693/', true);
	
	var coords = [];
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			errorMessage.innerHTML = '';
			
			var data = JSON.parse(request.responseText);
			console.log(data);
			for (var i in data) {
				coords.push( {lat: parseFloat(data[i][1]), lng: parseFloat(data[i][2]) } );
			}
		} else {
			errorMessage.innerHTML = 'Oh no, error!';
		}
		
		console.log(coords);
		var mapCenter = coords[0];
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 19,
			center: mapCenter
		});
		for (var i in coords) {
			var marker = new google.maps.Marker({
				position: coords[i],
				map: map
			});
		}
	};

	request.onerror = function() {
		errorMessage.innerHTML = 'Oh no, error!';
	};

	request.send();
}