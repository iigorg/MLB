const XMLParser = require('react-xml-parser');

export default class MLBGamedayApi {
	
	static getDayURL(year, month, day) {
		// Convert the month/day to two-digit format...
		if (month < 10) { month = "0" + month; }
		if (day < 10) { day = "0" + day; }

		//Format the URL...
		//return MLBGamedayApi.BaseURL
		//	+ "/components/game/mlb/"
		//	+ "year_" + year + "/"
		//	+ "month_" + month + "/"
		//	+ "day_" + day + "/";
		return `${MLBGamedayApi.BaseURL}/components/game/mlb/year_${year}/month_${month}/day_${day}/`
	}

	static getListOfGamesForDay(year, month, day) {
		let epgURL = MLBGamedayApi.getDayURL(year, month, day) + "epg.xml";		
		return fetch(epgURL)		 
		 .then(function(response) { return response.text(); })
		 .then(function(text) { return MLBGamedayApi.parseXML(text) })
		 .then(function(data){		    
		 	let games = data.getElementsByTagName("game");
		 	let urls = games.map(function(game) {
		 		let url = game.attributes["game_data_directory"];
		 		let awayTeamID = game.attributes["away_file_code"]
		 		let awayTeamName = game.attributes["away_team_name"]

		 		return { url, key: url, awayTeamID, awayTeamName };	 	
		 });

		  return Promise.resolve(urls);
		 })

	}

	static parseXML(s) {		
		let xml = new XMLParser().parseFromString(s);		
		return Promise.resolve(xml);				
	}

}


MLBGamedayApi.BaseURL = "https://gd2.mlb.com"