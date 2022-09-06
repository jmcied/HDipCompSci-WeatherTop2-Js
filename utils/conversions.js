"use strict";


const stationStore = require("../models/station-store");
const analytics = require("../utils/analytics");

const conversions = {
  currentWeather(code) {
      switch (code) {
        case 100:
          return "Clear";
        case 200:
          return "Partial clouds";
        case 300:
          return "Cloudy";
        case 400:
          return "Light Showers";
        case 500:
          return "Heavy Showers";
        case 600:
          return "Rain";
        case 700:
          return "Snow";
        case 800:
          return "Thunder";
      }
      return null;       
  },
  
  weatherIcons(code) {                    //take in code value and sets to string value i.e. weather description
    const weatherIcons = new Map()
    
    weatherIcons.set(100, "sun icon");
    weatherIcons.set(200, "cloud sun icon");
    weatherIcons.set(300, "cloud icon");
    weatherIcons.set(400, "cloud rain icon");
    weatherIcons.set(500, "cloud heavy showers icon");
    weatherIcons.set(600, "umbrella icon");
    weatherIcons.set(700, "snowflake icon");
    weatherIcons.set(800, "poo storm icon");

    return weatherIcons.get(code);
      
  },

  calcBeafourt(windSpeed) {
    if (windSpeed == 0) {
      return 0;
    } else if (windSpeed >= 1 && windSpeed <= 6) {
      return 1;
    } else if (windSpeed >= 7 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 29) {
      return 4;
    } else if (windSpeed >= 30 && windSpeed <= 39) {
      return 5;
    } else if (windSpeed >= 40 && windSpeed <= 50) {
      return 6;
    } else if (windSpeed >= 51 && windSpeed <= 62) {
      return 7;
    } else if (windSpeed >= 63 && windSpeed <= 75) {
      return 8;
    } else if (windSpeed >= 76 && windSpeed <= 87) {
      return 9;
    } else if (windSpeed >= 88 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else if (windSpeed >= 117) {
      return 12;
    }
    return -1;
  },
  
  degreesToCompass(deg) {                         //converts number deg value to string compass value
      if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "East North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East South East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },

  cToF(tempC) {
    return (tempC * 9) / 5 + 32;
  },
};

module.exports = conversions;
