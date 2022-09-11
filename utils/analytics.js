"use strict";

const stationStore = require("../models/station-store");
const conversions = require("../utils/conversions");

const analytics = {
  updateWeather(station) {
    if (station.readings.length > 0) {
      const lastReading = this.getLastReading(station.readings);
      station.lastReading = lastReading;
      station.code = lastReading.code;
      station.currentWeather = conversions.currentWeather(lastReading.code);
      station.weatherIcons = conversions.weatherIcons(lastReading.code);

      station.tempC = lastReading.temperature;
      station.tempF = conversions.cToF(station.tempC);
      station.maxTemp = analytics.getMaxTemp(station.readings); 
      station.minTemp = analytics.getMinTemp(station.readings);
      station.tempTrend = analytics.tempTrend(station.readings);

      station.windBft = conversions.calcBeafourt(lastReading.windSpeed);
      station.windCompass = conversions.degreesToCompass(lastReading.windDirection);
      station.windChill = analytics.windChill(lastReading.temperature,lastReading.windSpeed);
      station.maxWind = analytics.getMaxWind(station.readings);
      station.minWind = analytics.getMinWind(station.readings);
      station.windTrend = analytics.windTrends(station.readings);

      station.pressure = lastReading.pressure;
      station.maxPressure = analytics.getMaxPressure(station.readings);
      station.minPressure = analytics.getMinPressure(station.readings);
      station.pressureTrend = analytics.pressureTrends(station.readings);
    }
  },

  getLastReading(readings) {                      //Get Lastest Reading i.e. Last Reading
    return readings[readings.length - 1];
  },

  windChill(temp, windSpeed) {                    //Wind Chill calculation - Feels like
    return Math.round(
      13.12 +
        0.6215 * temp -
        11.37 * Math.pow(windSpeed, 0.16) +
        0.3965 * temp * Math.pow(windSpeed, 0.16)
    );
  },

  getMaxTemp(readings) {                             //iteriate through array returning maximum temperature                                                     
    let maxTemp = readings[0].temperature;           //set first reading to initial maxValue
    for (const reading of readings) {                //iteriate through array                                        
      if (reading.temperature > maxTemp) {           // if temperature reading is larger than current max        
        maxTemp = reading.temperature;               // re-assign new max value
      }
    }
    return maxTemp;                                  //Return max value
  },

  getMinTemp(readings) {
    let minTemp = readings[0].temperature;
    for (const reading of readings) {
      if (reading.temperature < minTemp) {
        minTemp = reading.temperature;
      }
    }
    return minTemp;
  },

  getMaxWind(readings) {
    let maxWind = readings[0].windSpeed;
    for (const reading of readings) {
      if (reading.windSpeed > maxWind) {
        maxWind = reading.windSpeed;
      }
    }
    return maxWind;
  },

  getMinWind(readings) {
    let minWind = readings[0].windSpeed;
    for (const reading of readings) {
      if (reading.windSpeed < minWind) {
        minWind = reading.windSpeed;
      }
    }
    return minWind;
  },

  getMaxPressure(readings) {
    let maxPressure = readings[0].pressure;
    for (const reading of readings) {
      if (reading.pressure > maxPressure) {
        maxPressure = reading.pressure;
      }
    }
    return maxPressure;
  },

  getMinPressure(readings) {
    let minPressure = readings[0].pressure;
    for (const reading of readings) {
      if (reading.pressure < minPressure) {
        minPressure = reading.pressure;
      }
    }
    return minPressure;
  },
  
  tempTrend(readings){
    let trend = null;
    if (readings.length > 2) {
    const values = [readings[readings.length - 3].temperature, readings[readings.length - 2].temperature, readings[readings.length - 1].temperature];
        if (values.length > 2) {
      if (( values[2] > values[1] ) && (values[1] > values[0])) {
        trend = "right floated big arrow up icon";
      } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
        trend = "right floated big arrow down icon";
      }
    }
    }
    return trend;
  },
  
  windTrends(readings){
    let trend = null;
    if (readings.length > 2) {
    const values = [readings[readings.length - 3].windSpeed, readings[readings.length - 2].windSpeed, readings[readings.length - 1].windSpeed];
        if (values.length > 2) {
      if (( values[2] > values[1] ) && (values[1] > values[0])) {
        trend = "right floated big arrow up icon";
      } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
        trend = "right floated big arrow down icon";
      }
    }
    }
    return trend;
  },
  
  pressureTrends(readings){
    let trend = null;
    if (readings.length > 2) {
    const values = [readings[readings.length - 3].pressure, readings[readings.length - 2].pressure, readings[readings.length - 1].pressure];
        if (values.length > 2) {
      if (( values[2] > values[1] ) && (values[1] > values[0])) {
        trend = "right floated big arrow up icon";
      } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
        trend = "right floated big arrow down icon";
      }
    }
    }
    return trend;
  },
  };

module.exports = analytics;
  
  
/*  calcTrend(values[]){                      //Tried to call a calculate trend function within Temp, Wind & Pressure
    let trend = null;
      if (values.length > 2) {
      if (( values[2] > values[1] ) && (values[1] > values[0])) {
        trend = 1;
      } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
        trend = -1;
      }
    }
    return trend;
  }
*/  
  

