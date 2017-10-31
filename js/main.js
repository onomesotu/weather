var main = function(){
	/****jQuery Autocomplete***/
	/*Insert jQuery autocomplete UI*/
		var availableCities = ['Kabul','Tirana','Algiers',
			'Jordan','Andorra la Vella','Luanda','Buenos Aires','Yerevan',
			'Canberra','Vienna','Nassau','Manama','Azerbaijan','Dhaka','Bridgetown',
			'Minsk','Brussels','Belmopan','Porto Novo','Switzerland','Thimphu',
			'La Paz','Sarajevo','Gaborone','Brasilia','Bandar Seri Begawan',
			'Sofia','Ouagadougou','Bujumbura','Phnom Penh','Yaounde','Ottawa',
			'Praia','Bangui','Santiago','Beijing','Bogota','Moroni','Kinshasa','Brazzaville','San Jose',
			'Yamoussoukro','Zagreb','Havana','Nicosia','Prague','Copenhagen',
			'Djibouti','Roseau','Santo Domingo','Dili','Quito','Cairo',
			'San Salvador','Malabo','Asmara','Tallinn','Addis Ababa',
			'Palikir','Suva','Helsinki','Paris','Cayenne','Libreville',
			'Banjul','Tbilisi','Berlin','Accra','Athens','Saint George',
			'Guatemala City','Conakry','Bissau','Georgetown','Port au Prince','Tegucigalpa',
			'Budapest','Reykjavik','New Delhi','Jakarta','Tehran','Baghdad',
			'Dublin','Tel Aviv','Rome','Kingston','Tokyo','Astana','Nairobi',
			'Tarawa Atoll','Pristina','Kuwait City',
			'Bishkek','Vientiane','Riga','Beirut','Maseru','Monrovia',
			'Tripoli','Vaduz','Vilnius','Luxembourg','Skopje','Antananarivo',
			'Lilongwe','Kuala Lumpur','Male','Bamako','Valletta','Majuro',
			'Nouakchott','Port Louis','Mexico City','Chisinau','Monaco',
			'Ulaanbaatar','Podgorica','Rabat','Maputo','Burma','Windhoek',
			'Nauru','Kathmandu','Amsterdam','Wellington',
			'Managua','Niamey','Abuja','Pyongyang','Belfast','Oslo',
			'Muscat','Islamabad','Melekeok','Panama City','Port Moresby','Asuncion',
			'Lima','Manila','Warsaw','Lisbon','Doha','Bucharest',
			'Moscow','Kigali','Basseterre','Castries','Kingstown','Apia',
			'San Marino','Sao Tome','Riyadh','Edinburgh','Dakar','Belgrade',
			'Victoria','Freetown','Singapore','Bratislava','Ljubljana','Honiara',
			'Mogadishu','Pretoria','Seoul','Juba','Madrid','Colombo',
			'Khartoum','Paramaribo','Mbabana','Stockholm','Damascus','Taipei',
			'Dushanbe','Dodoma','Bangkok','Lome','Port of Spain','Tunis','Ankara',
			'Ashgabat','Kampala','Kiev','Abu Dhabi','London',
			'Washington DC','Montevideo','Tashkent','Port Vila',
			'Vatican City','Caracas','Hanoi','Cardiff','Sanaa','Lusaka','Harare','Lagos'].sort();

		//availableCities = availableCities.sort();
		$("#search").autocomplete({
			source: availableCities
		});
	

	/**Parsing JSON data to HTML**/
	/*
	Function that parses the data from JSON format
	to the respective HTML elements
	*/
	function parseJsonToHtml(json){
		var kelvin = 273.15,
			cityName = json.name,
			weather = json.weather[0]['main'],
			description = json.weather[0]['description'],
			temperature = Math.ceil(json.main['temp'] - kelvin),
			humidity = json.main['humidity'],
			pressure = json.main['pressure'],
			windSpeed = json.wind['speed'],
			sunrise = json.sys['sunrise'],
			sunset = json.sys['sunset'];
		
		$('#main').css({
			'background':'url(../pictures/' + weather + '.jpg)', 
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'background-size': 'cover',
			'height': '80vh',
			'color': '#fff'
		});
			

		var degree = '<h1>' + temperature + '<span>&deg;C</span></h1>',
			weather_description = weather + ', ' + description,
			wind = '<p>Wind speed: ' + windSpeed + 'm/s</p>',
			humidityValue = '<p>Humidity: ' + humidity + '&#37;</p>',
			pressureValue = '<p>Pressure: ' + pressure + 'hPa</p>';
			sun_rise = '<p>Sunrise: ' + convertUnixTime(sunrise); + '</p>',
			sun_set = '<p>Sunset: ' + convertUnixTime(sunset); + '</p>';
	
			
		$('.city').html(cityName);
		$('.description').html(weather_description);
		$('.degree').html(degree);
		$('.wind').html(wind);
		$('.pressure').html(pressureValue);
		$('.humidity').html(humidityValue);
		$('.sunrise').html(sun_rise);
		$('.sunset').html(sun_set);

	}

	/**Function that converts API unix time to local time**/
	function convertUnixTime(time){
		var date = new Date(time*1000);
		// Hours part from the timestamp
		var hours = date.getHours();
		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();
		// Seconds part from the timestamp
		var seconds = "0" + date.getSeconds();
		// Will display time in 10:30:23 format
		var finalTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

		return finalTime;
	}

	/**Function that converts temperature in celcius to fahrenheit**/
	function CelsiusToFahrenheit(temperature){

	}

	/****Background picture function*****/
	/*Function to call that changes the background
	picture depending on the weather condition
	*/

	/****API CALLS******/
	//Preset API CALL
	/*When document is ready, make an api call
	to get weather for helsinki. 
	*/
	var openWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Helsinki&APPID=b24f5a1046585cfcd7ab26e64c0516bc';
	$.getJSON(openWeatherAPI, parseJsonToHtml);

	//API CALL FOR CITY SEARCH
	/*
	On search, make an api call for the selected city
	*/
	function getWeather(e){
		//get the value of the search form
		e.preventDefault();
		var city = $('#search').val();
		openWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=b24f5a1046585cfcd7ab26e64c0516bc';
		if(city === '')
			$('.city').html('<h2 class="city_error">You forgot to enter a city<h2>');
		else
			$('.city').html('<h2 class="loading">Loading weather data....<h2>');
			$.getJSON(openWeatherAPI, parseJsonToHtml);

	}
	$('#searchButton').on('click', getWeather);


	//GET LOCATION
	/*When the get location button is clicked,
	Get user longitude and latitude and 
	pass it to the api call
	*/
  	function getLocation() {
  		if (navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function(position) {
    			var lat = position.coords.latitude;
    			var lon = position.coords.longitude;
    			var openWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +'&APPID=b24f5a1046585cfcd7ab26e64c0516bc';
	  			$.ajax({
					url: openWeatherAPI, 
					dataType: 'json',
					crossDomain: true,  
					success: parseJsonToHtml,
					error: function(){
						console.log('Did not connect');
					},
					method: 'GET'
				});
  			});
  		}
	}
	$('#header').on('click', '.get_location', getLocation);

}

$(document).ready(main);