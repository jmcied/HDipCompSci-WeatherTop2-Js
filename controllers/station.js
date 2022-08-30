'use strict';


const logger = require('../utils/logger');
const stationStore = require('../models/station-store');
const stationAnalytics = require("../utils/stationAnalytics");

const station = {    
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);
    
//    if (station.readings.length > 0){
//      const latestReading = stationAnalytics.getLatestReading(station);
      
    
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
//      latestReading: latestReading,
    };
    logger.info('about to render', stationStore.getStation(stationId));
    response.render('station', viewData);
    },
  
   removeReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingId;
    logger.info(`Deleting Reading ${readingId} from station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },

  addReading(request, response){
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;