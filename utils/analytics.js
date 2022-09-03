"use strict";

const stationStore = require("../models/station-store");
const conversions = require("../utils/conversions");

const analytics = {
  
  updateWeather(station){
    if(station.readings.length  > 0){
     const lastReading = this.getLastReading(station.readings);
      station.lastReading = lastReading;
      station.code = lastReading.code;
      station.currentWeather = conversions.currentWeather(lastReading.code);
      
      station.tempC = lastReading.temperature;
      station.tempF = conversions.cToF(station.tempC);
      station.pressure = lastReading.pressure;
      
      station.windBft = conversions.calcBeafourt(lastReading.windSpeed);
      station.windCompass = conversions.degreesToCompass(lastReading.windDirection)
      station.windChill =  analytics.windChill(lastReading.temperature, lastReading.windSpeed);
    }
    
  },
  
  getLastReading(readings) {
//    let latestReading = null;
//    let weatherIcon = null;
//    if (station.readings.length > 0) {
//      latestReading = station.readings[station.readings.length - 1];
//    }
    return readings[readings.length-1];
  },
  
  windChill(temp, windSpeed) {
    return Math.round (13.12 + 0.6215 * temp -  11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * temp * (Math.pow(windSpeed, 0.16)));
  },
  
};

module.exports = analytics;