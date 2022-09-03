"use strict";

const stationStore = require("../models/station-store");
const conversions = require("../utils/conversions");

const analytics = {
  
  updateWeather(station){
    if(station.readings.length  > 0){
     const lastReading = this.getLastReading(station.readings);
      station.lastReading = lastReading;
      station.code = lastReading.code;
      
      station.tempC = lastReading.temperature;
      station.tempF = conversions.cToF(station.tempC);
      station.pressure = lastReading.pressure;
      
      station.windBft = conversions.calcBeafourt(lastReading.windSpeed);
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
};

module.exports = analytics;