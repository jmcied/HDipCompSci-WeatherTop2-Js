"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const analytics = require("../utils/analytics");
const conversions = require("../utils/conversions");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info("Station id = " + stationId);

    for (const station of stationStore.getAllStations()) {
      analytics.updateWeather(station);
    }

    //    if (station.readings.length > 0){
    //      const latestReading = stationAnalytics.getLatestReading(station);

    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      //      latestReading: latestReading,
    };
    logger.info("about to render", stationStore.getStation(stationId));
    response.render("station", viewData);
  },

  removeReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingId;
    logger.info(`Deleting Reading ${readingId} from station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    stationStore.addReading(stationId, newReading);
    logger.debug("New Reading = ", newReading);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
