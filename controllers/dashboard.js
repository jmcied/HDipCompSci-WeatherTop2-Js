"use strict";

const accounts = require ("./accounts.js");
const uuid = require("uuid");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const analytics = require("../utils/analytics");
 
const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");  
    const loggedInUser = accounts.getCurrentUser(request);
  
    stationStore.getAllStations().sort((a,b) => a.name.localeCompare(b.name));
  
    const viewData = {
      title: "Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),    //list only stations on User account    
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);      
  },  

  addStation(request, response) {                              //Add new Station - Name, Latitude, Longitude Fields
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info("Deleting Station ${stationId}");
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;

  
    //for (const station of stationStore.getAllStations()) {      
    //  analytics.updateWeather(station);
   // }
     