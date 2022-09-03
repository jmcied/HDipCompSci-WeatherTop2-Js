"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const analytics = require("../utils/analytics");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    for(const station of stationStore.getAllStations()){
      analytics.updateWeather(station);
    }

//    for (let i = 0; i < stationStore.length; i++) {
//      const station = stationStore[i];

//      station.latestWeather = stationAnalytics.latestWeather(station);
//    }

    const viewData = {
      title: "WeatherTop2-JS Dashboard",
      stations: stationStore.getAllStations(),
      lastReadings: analytics.updateWeather.stations,
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info('Deleting Station ${stationId}');
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  }
};

module.exports = dashboard;
