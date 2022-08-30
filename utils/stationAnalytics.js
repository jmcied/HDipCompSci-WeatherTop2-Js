"use strict";

const stationStore = require("../models/station-store");

const stationAnalytics = {
  
  getLatestReading(station) {
    let latestReading = null;
    let weatherIcon = null;
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
    }
    return latestReading;
  },
};

module.exports = stationAnalytics;