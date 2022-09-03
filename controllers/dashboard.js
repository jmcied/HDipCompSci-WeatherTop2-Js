"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const analytics = require("../utils/analytics");


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    for(const station of stationStore.getAllStations()){
      analytics.updateWeather(station);
    }

    const viewData = {
      title: "WeatherTop2-JS Dashboard",
      stations: stationStore.getAllStations(),
      lastReadings: analytics.updateWeather.stations,
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },
  
  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings:[],
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info('Deleting Station ${stationId}');
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  }
};

module.exports = dashboard;
