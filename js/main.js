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
			'San Salvador','London','Malabo','Asmara','Tallinn','Addis Ababa',
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

	/****Background picture function*****/
	/*Function to call that changes the background
	picture depending on the weather condition
	*/

	/****API CALLS******/
	//Preset API CALL
	/*When document is ready, make an api call
	to get weather for helsinki. 
	*/


	//API CALL FOR CITY SEARCH
	/*
	On search, make an api call for the selected city
	*/
	var getWeather = function(){
		//get the value of the search form
		var city = $('#search').val();
		var openWeatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=b24f5a1046585cfcd7ab26e64c0516bc';
		if(city === '')
			$('.city').html('<h2 class="city_error">You forgot to enter a city<h2>');
		else
			$('.city').html('<h2 class="loading">Loading weather data....<h2>');
			$.getJSON(openWeatherAPI, function(json) {
			console.log(json);
		});
	}
	$("#searchButton").click(getWeather);


	//GET LOCATION
	/*When the get location button is clicked,
	Get user longitude and latitude and 
	pass it to the api call
	*/
}

$(document).ready(main);