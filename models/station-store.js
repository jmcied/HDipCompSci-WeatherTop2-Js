'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const stationStore = {
  
  store: new JsonStore('./models/station-store.json', {stationCollection: [] }),
  collection: 'stationCollection',

  //stationCollection: require('./station-store.json').stationCollection,

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
   return this.store.findOneBy(this.collection, {id:id});
  },
  
  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },
  
  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },
  
  removeAllStations(){
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
  
  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },
      
  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(station.readings, {id: readingId});
    this.store.save();
  },  
};

module.exports = stationStore;

/*  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
   return _.find(this.stationCollection, {id:id});
  },
  
  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, {id: readingId})
  },
  
  removeStation(id) {
    _.remove(this.stationCollection, {id: id});
  },
  
  addStation(station) {
    this.stationCollection.push(station);
  },
  
  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  }
};
*/