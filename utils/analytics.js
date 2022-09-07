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
      station.maxTemp = analytics.getMaxTemp(station.readings); //continue here max temp calc function not defined yet
      station.minTemp = analytics.getMinTemp(station.readings);

      station.windBft = conversions.calcBeafourt(lastReading.windSpeed);
      station.windCompass = conversions.degreesToCompass(
        lastReading.windDirection
      );
      station.windChill = analytics.windChill(
        lastReading.temperature,
        lastReading.windSpeed
      );
      station.maxWind = analytics.getMaxWind(station.readings);
      station.minWind = analytics.getMinWind(station.readings);

      station.pressure = lastReading.pressure;
      station.maxPressure = analytics.getMaxPressure(station.readings);
      station.minPressure = analytics.getMinPressure(station.readings);
    }
  },

  getLastReading(readings) {
    return readings[readings.length - 1];
  },

  windChill(temp, windSpeed) {
    return Math.round(
      13.12 +
        0.6215 * temp -
        11.37 * Math.pow(windSpeed, 0.16) +
        0.3965 * temp * Math.pow(windSpeed, 0.16)
    );
  },

  getMaxTemp(readings) {
    //iteriate through array returning maximum temperature
    let maxTemp = readings[0].temperature; //set first reading to initial maxValue
    for (const reading of readings) {
      //iteriate through array
      if (reading.temperature > maxTemp) {
        // if temperature reading is larger than current max
        maxTemp = reading.temperature; // re-assign new max value
      }
    }
    return maxTemp;
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
};

module.exports = analytics;
